import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {

  transform(dataPoints: Array<any>, time: any, unit: string, field: string = "timestamp"): Array<any> {
    if (!time) return Array<any>();
    try {
      var filtered = dataPoints.filter(dp => dp[field].isSame(time, unit));
    } catch (e) {
      console.error("Error while filtering data", dataPoints, e);
      var filtered = Array<any>();
    }
    return filtered;
  }

}
