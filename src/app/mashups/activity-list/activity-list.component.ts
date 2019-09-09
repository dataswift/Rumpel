/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { DayGroupedSheFeed, SheFeed } from '../../she/she-feed.interface';

@Component({
  selector: 'rum-activity-list',
  templateUrl: 'activity-list.component.html',
  styleUrls: ['activity-list.component.scss']
})
export class ActivityListComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() componentHeight: string;
  @Input() cards: DayGroupedSheFeed[] = [];
  @Input() selectedDate: Moment;

  @Output() timeSelected = new EventEmitter<string>();
  @Output() locationSelected: EventEmitter<{ lat: number; long: number; }> = new EventEmitter<{ lat: number; long: number; }>();

  @ViewChild('activityList', { static: true }) activityListEl: ElementRef;

  public moment: Moment = moment();
  public today = moment().format('YYYY-MM-DD');
  public cardList: Array<{ day: string; dayList: HatRecord<any>[]; }> = [];
  public datesInRange = [];
  public currentMonth = '';

  constructor() {}

  ngOnInit() {
    this.getMonthsInRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDate && changes.selectedDate.currentValue) {
      this.scrollToDate(changes.selectedDate.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.scrollToDate(moment());
  }

  selectLocation(sheItem: SheFeed): void {
    if (sheItem.location && sheItem.location.geo) {
      const { latitude, longitude } = sheItem.location.geo;
      this.locationSelected.emit({ lat: latitude, long: longitude });
    }
  }

  getMonthsInRange() {
    setInterval( () => {

      this.datesInRange = [];
      const dates = document.getElementsByClassName('date');

      for (let i = 0; i < dates.length; i++) {
        const $this = <HTMLScriptElement>dates[i];
        const activityList = <HTMLScriptElement>document.getElementsByClassName('activitylist-container')[0];

        if ($this.offsetTop < (activityList.offsetHeight + activityList.scrollTop) && $this.offsetTop > activityList.scrollTop) {
          if (this.cardList.length > 0) {
            const monthInRange = this.cardList[i].day.split('-').slice(0, 2).join('-');

            if (!this.datesInRange.includes(monthInRange)) {
              this.datesInRange.push(monthInRange);
            }
          }
        }
      }

      const tempMonths = [];

      for (let j = 0; j < this.datesInRange.length; j++) {
        const formattedMonth = moment(this.datesInRange[j], 'YYYY-MM');
        tempMonths.push(formattedMonth.format('MMM YYYY'));
      }

      this.currentMonth = tempMonths.join(' / ');

      // this.notifyDatesInRange.emit(this.datesInRange);
    }, 1000);
  }


  scrollToItem(index: number) {
    // this.timeSelected.emit(this.cardList[index].day);

    if (index === 0) {
      this.activityListEl.nativeElement.scrollTop = 0;
    } else {
      const targetPosition = this.activityListEl.nativeElement.children[index + 1].offsetTop;
      this.activityListEl.nativeElement.scrollTop = targetPosition;
    }
  }

  private scrollToDate(dateTime: Moment): void {
    const selectedDay = <HTMLElement>document.querySelector('.day-wrapper-' +
      dateTime.format('dddDDMMMYYYY').toLowerCase());

    if (selectedDay) {
      document.querySelector('.activitylist-container').scrollTop = selectedDay.offsetTop;
    }
  }

}
