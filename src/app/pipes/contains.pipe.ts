import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contains'
})
export class ContainsPipe implements PipeTransform {

  transform(values: Array<any>, args?: any): any {
    return values.filter(value => !!value[args]);
  }

}
