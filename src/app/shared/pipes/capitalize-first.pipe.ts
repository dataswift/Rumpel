import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(str: any, args?: any): any {
    if (str) {
      return str[0].toUpperCase() + str.substr(1).toLowerCase();
    } else {
      return str;
    }
  }
}
