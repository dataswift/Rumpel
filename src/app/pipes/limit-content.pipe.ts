import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitContent'
})
export class LimitContentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length > args) {
      return value.substr(0, args) + '...';
    } else {
      return value;
    }

  }

}
