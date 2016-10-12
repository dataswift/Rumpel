import { Pipe, PipeTransform } from '@angular/core';
import { DataPoint } from '../shared';

@Pipe({
  name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {

  transform(dataPoints: Array<DataPoint>, time, unit): Array<DataPoint> {
    if (!time) return dataPoints;
    return dataPoints.filter(dp => dp.timestamp.isSame(time, unit));
  }

}
