/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';
import { ExpandedTime } from '../interfaces/index';

@Pipe({
  name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {

  transform(dataPoints: Array<any>, time: ExpandedTime, unit: string, field: string = 'timestamp'): Array<any> {
    if (!time) {
      return dataPoints;
    }

    let filtered: Array<any>;

    try {
      filtered = dataPoints.filter(dp => dp.data[field].isSame(time.timestamp, unit));
    } catch (e) {
      console.error('Error while filtering data', dataPoints, e);
      filtered = [];
    }

    return filtered;
  }

}
