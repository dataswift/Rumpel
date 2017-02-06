import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'timeFilterTwo'
})
export class TimeFilterTwoPipe implements PipeTransform {

  transform(timedData: Array<any>, startTime: Moment, endTime: Moment): Array<any> {
    if (startTime && endTime) {
      return timedData.filter(dp => dp.timestamp.isAfter(startTime) && dp.timestamp.isBefore(endTime));
    } else if (startTime) {
      return timedData.filter(dp => dp.timestamp.isAfter(startTime))
    } else {
      return timedData;
    }
  }

}
