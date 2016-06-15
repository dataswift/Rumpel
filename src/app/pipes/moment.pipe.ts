import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class Moment implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null) return undefined;
    return args ? value.format(args) : value.format('DD/MM/YYYY, h:mm a');
  }

}
