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
        let today = moment();
        filteredData = timedData.filter(dataPoint => dataPoint.timestamp.isSame(today, 'd'));
        break;
      case 'yesterday':
        let yesterday = moment().subtract(1, 'days');
        filteredData = timedData.filter(dataPoint => dataPoint.timestamp.isSame(yesterday, 'd'));
        break;
      case 'last week':
        let weekAgo = moment().subtract(7, 'days');
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
