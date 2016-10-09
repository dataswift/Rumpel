import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(values: Array<any>, property: string, match: string = null): any {
    if (match) {
      return values.filter(value => value[property] === match);
    } else {
      return values;
    }

  }

}
