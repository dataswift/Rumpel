import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {

  transform(dataPoints: Array<any>, time: any, unit: string): Array<any> {
    if (!time) return Array<any>();
    return dataPoints.filter(dp => dp.timestamp.isSame(time, unit));
  }

}
