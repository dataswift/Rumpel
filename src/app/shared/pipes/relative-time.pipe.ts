import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string): any {
    console.log(value);
    return moment.unix(parseInt(value, 10)).fromNow();
  }

}
