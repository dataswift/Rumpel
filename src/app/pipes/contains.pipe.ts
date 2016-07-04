import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contains'
})
export class ContainsPipe implements PipeTransform {

  transform(values: Array<any>, args?: any): any {
    if (!values) return values;
    return values.filter(value => !!value[args]);
  }

}
