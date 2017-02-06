/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core'
import * as moment from 'moment';
import { ExpandedTime } from '../../interfaces/index';

@Component({
  selector: 'rump-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() timeline: Array<ExpandedTime>;
  @Input() selectedTime: ExpandedTime;
  @Output() timeSelected = new EventEmitter<ExpandedTime>();
  private selected: ExpandedTime;
  private timelineGrouped: Array<[string, Array<ExpandedTime>]> = [];

  @ViewChild('timelineScroll') private timelineScrollContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    for (let propName in changes) {
      if (propName === 'selectedTime') {
        if (this.selectedTime === null) {
          this.selected = { timestamp: moment(), unixDayStart: 0 };
        } else {
          this.selected = this.selectedTime;
        }
      }

      if (propName === 'timeline') {
        if (this.timeline && this.timeline.length > 0 && !this.selectedTime) {
          this.selected = this.timeline[0]
        } else if (this.selectedTime) {
          this.selected = this.selectedTime;
        }

        let grouped = this.timeline.reduce(function (acc, item) {
          let month = item.timestamp.format("MMMM, YYYY");
          if (month in acc) {
            acc[month].push(item);
          }
          else {
            acc[month] = new Array<ExpandedTime>(item);
          }
          return acc;
        }, {});

        this.timelineGrouped = [];
        for (let month in grouped) {
          this.timelineGrouped.push([month, grouped[month]])
        }

        // ensure that the months in the timeline are ordered appropriately
        // should not be necessary unless dealing with large data sets
        this.timelineGrouped.sort((a1, a2) => {
          return a1[1][0].timestamp.isBefore(a2[1][0].timestamp) ? 1 : -1;
        });
      }
    }
  }

  selectTime(day: ExpandedTime) {
    this.selected = day;
    this.timeSelected.emit(day);
  }

  scrollUp() {
    try {
      this.timelineScrollContainer.nativeElement.scrollTop = this.timelineScrollContainer.nativeElement.scrollTop - 100;
    } catch(err) { console.error(err); }
  }

  scrollDown() {
    try {
      this.timelineScrollContainer.nativeElement.scrollTop = this.timelineScrollContainer.nativeElement.scrollTop + 100;
    } catch(err) { console.error(err); }
  }
}
