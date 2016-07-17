import { Pipe, PipeTransform } from '@angular/core';
import { DataPoint } from '../shared';

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {

  transform(dataPoints: Array<DataPoint>, location: boolean): Array<DataPoint> {
    return location ? dataPoints.filter(dp => !!dp.location) : dataPoints.filter(dp => !dp.location);
  }

}
