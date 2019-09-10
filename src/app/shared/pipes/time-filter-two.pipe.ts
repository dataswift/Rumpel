/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2, 2017
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { HatRecord } from '../interfaces/hat-record.interface';

@Pipe({
  name: 'timeFilterTwo'
})
export class TimeFilterTwoPipe implements PipeTransform {

  transform(timedData: HatRecord<any>[], startTime?: Moment, endTime?: Moment): Array<any> {
    if (startTime && endTime) {
      return timedData.filter(dp => dp.data.timestamp.isAfter(startTime) && dp.data.timestamp.isBefore(endTime));
    } else if (startTime) {
      return timedData.filter(dp => dp.data.timestamp.isAfter(startTime));
    } else {
      return timedData;
    }
  }

}
