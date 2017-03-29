/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeTimesFilter'
})
export class RelativeTimesFilterPipe implements PipeTransform {

  transform(timedData: Array<any>, relativeTime: string): any {
    let filteredData: Array<any>;
    switch (relativeTime) {
      case 'today':
        const today = moment();
        filteredData = timedData.filter(dataPoint => dataPoint.timestamp.isSame(today, 'd'));
        break;
      case 'yesterday':
        const yesterday = moment().subtract(1, 'days');
        filteredData = timedData.filter(dataPoint => dataPoint.timestamp.isSame(yesterday, 'd'));
        break;
      case 'last week':
        const weekAgo = moment().subtract(7, 'days');
        filteredData = timedData.filter(dataPoint => dataPoint.timestamp.isAfter(weekAgo));
        break;
      case 'all':
        filteredData = timedData;
        break;
      default:
        filteredData = [];
    }
    return filteredData;
  }

}
