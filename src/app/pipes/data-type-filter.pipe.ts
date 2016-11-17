import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTypeFilter'
})
export class DataTypeFilterPipe implements PipeTransform {

  transform(dataPoints: Array<any>, type: string): Array<any> {
    return dataPoints.filter(dp => dp.type === type);
  }

}
