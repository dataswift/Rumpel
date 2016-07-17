import { Pipe, PipeTransform } from '@angular/core';
import { DataPoint } from '../shared';

@Pipe({
  name: 'dataTypeFilter'
})
export class DataTypeFilterPipe implements PipeTransform {

  transform(dataPoints: Array<DataPoint>, type: string): Array<DataPoint> {
    return dataPoints.filter(dp => dp.type === type);
  }

}
