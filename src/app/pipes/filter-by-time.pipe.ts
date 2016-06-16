import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTime'
})
export class FilterByTime implements PipeTransform {

  transform(values: Array<any>, args?: any): any {
    if (!args) return values;
    return values.filter(value => value.timestamp.isSame(args, 'day'));
  }

}
