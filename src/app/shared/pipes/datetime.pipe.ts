import { Pipe, PipeTransform } from '@angular/core';

import * as parse from 'date-fns/parse';
import * as format from 'date-fns/format';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(date: string | number | Date, to: string = 'YYYY-MM-DDTHH:mm:ssZ'): string {
    const nativeDate = parse(date);

    return format(nativeDate, to);
  }
}
