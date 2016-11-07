import { Pipe, PipeTransform } from '@angular/core';
import { ExpandedTime } from '../interfaces/index';

@Pipe({
  name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {

  transform(dataPoints: Array<any>, time: ExpandedTime, unit: string, field: string = "timestamp"): Array<any> {
    if (!time) {
      return dataPoints;
    }

    try {
      var filtered = dataPoints.filter(dp => dp[field].isSame(time.timestamp, unit));
    } catch (e) {
      console.error("Error while filtering data", dataPoints, e);
      var filtered = Array<any>();
    }
    return filtered;
  }

}
