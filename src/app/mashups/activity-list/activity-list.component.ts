/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Post, Tweet, Photo, Notable } from '../../shared/interfaces/index';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ExpandedTime } from '../../shared/interfaces/index';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

declare var $: any;

@Component({
  selector: 'rump-activity-list',
  templateUrl: 'activity-list.component.html',
  styleUrls: ['activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  @Input() componentHeight: string;
  @Input() eventList: Array<any>;
  @Input() timeline: Array<ExpandedTime>;

  @Output() timeSelected = new EventEmitter<ExpandedTime>();
  @Output() notifyDatesInRange: EventEmitter<any> = new EventEmitter();

  public moment: Moment = moment();
  public datesInRange = [];
  public currentMonth:String = "";
  public date: DateModel;
  public options: DatePickerOptions;

  constructor() {
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
    $('.backToTop i').popover({html: true, content: '<p style="text-align: center">Back to today\'s date</p>'});

    this.getMonthsInRange();

    this.options.maxDate = moment().toDate();

  }


  changeDate(e) {
    const targetDate = this.date.momentObj;
    let closestDate = moment();
    let closestDateDistance = Math.abs( closestDate.diff(targetDate, 'days') );
    let targetIndex = 0;

    if(targetDate.isValid() && targetDate.isSameOrBefore(this.moment) ) {

      for(let i = 0; i < this.eventList.length; i++){

        const newClosestDateDistance = Math.abs( this.eventList[i].timestamp.diff( targetDate, 'days' ) );

        if( newClosestDateDistance < closestDateDistance ) {
          closestDateDistance = Math.abs( this.eventList[i].timestamp.diff(targetDate, 'days') );
          closestDate = this.eventList[i].timestamp;
          targetIndex = i;
        }
      }
      this.scrollToItem(targetIndex);
    }
  }


  getMonthsInRange() {
    const self = this;

    setInterval(function() {

      self.datesInRange = [];
      const dates = document.getElementsByClassName('date');
      for (let i = 0; i < dates.length; i++) {

        const $this = <HTMLScriptElement>dates[i];
        const activityList = <HTMLScriptElement>document.getElementsByClassName('activitylist-container')[0];

        if ( $this.offsetTop < ( activityList.offsetHeight + activityList.scrollTop ) && $this.offsetTop > activityList.scrollTop ) {
              const monthInRange = self.eventList[i].timestamp.format('MM YYYY');
              if (!self.datesInRange.includes(monthInRange) ) {
                self.datesInRange.push(monthInRange);
              }
        }
      }

      let tempMonths = [];

      for ( let j = 0; j < self.datesInRange.length; j++ ) {
        const formattedMonth = moment( self.datesInRange[j], "MM YYYY");
        tempMonths.push( formattedMonth.format("MMM YYYY") );
      }

      self.currentMonth = tempMonths.join(" / ");

      self.notifyDatesInRange.emit(self.datesInRange);
    }, 1000);
  }


  scrollToItem(index) {

    for (let i = 0; i < this.eventList.length; i++) {
      this.eventList[i].selected = false;
    }

    this.eventList[index].selected = true;
    const time: ExpandedTime = new ExpandedTime( this.eventList[index].timestamp );
    this.timeSelected.emit( time );

    if (index === 0) {
      $('.activitylist-container').animate({ scrollTop: 0 }, 'slow');
    }
    else {
      const targetPosition = $('.activitylist-container').children().eq(index+1)[0].offsetTop;
      //console.log(targetPosition);
      $('.activitylist-container').animate({ scrollTop: targetPosition }, 'slow');
    }

  }

}
