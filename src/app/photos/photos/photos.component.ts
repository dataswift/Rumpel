/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ExpandedTime } from '../../shared/interfaces/index';
import * as moment from 'moment';

@Component({
  selector: 'rum-photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public images: Array<any> = [];
  public timeline: Array<ExpandedTime> = [];
  public selectedTime: ExpandedTime = null;
  public showTimeline: boolean;

  constructor() {}

  ngOnInit() {
    this.showTimeline = true;
  }

  selectControlsTime(relativeTime: string) {
    switch (relativeTime) {
      case 'today':
        this.selectedTime = new ExpandedTime(moment());
        break;
      case 'yesterday':
        this.selectedTime = new ExpandedTime(moment().subtract(1, 'days'));
        break;
      case 'all':
        this.selectedTime = null;
        break;
    }
  }

  selectTime(event) {
    this.selectedTime = event;
  }

  isSelectedTime(relativeTime: string): boolean {
    if (this.selectedTime === null) {
      return false;
    }
    switch (relativeTime) {
      case 'today':
        return this.selectedTime.unixDayStart === moment().startOf('day').unix();
      case 'yesterday':
        return this.selectedTime.unixDayStart === moment().subtract(1, 'days').startOf('day').unix();
    }
  }

  private addDatesToTimeline(dataPoints: Array<any>) {
    const timestamps: Array<ExpandedTime> = _.sortedUniqBy(
      dataPoints.map(dp => new ExpandedTime(dp.timestamp)).sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1),
      'unixDayStart');

    this.timeline = _.unionBy(this.timeline, timestamps, 'unixDayStart').sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1);
  }
}
