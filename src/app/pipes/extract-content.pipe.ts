import { Pipe, PipeTransform } from '@angular/core';
import { DataPoint } from '../shared';

@Pipe({
  name: 'extractContent'
})
export class ExtractContentPipe implements PipeTransform {

  transform(dataPoints: Array<DataPoint>, args?: any): any {
    return dataPoints.map(dp => dp.content);
  }

}
