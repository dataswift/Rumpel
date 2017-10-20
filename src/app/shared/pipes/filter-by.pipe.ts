/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';
import { HatRecord } from '../interfaces/hat-record.interface';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(values: HatRecord<any>[], property: string, match: string = ''): HatRecord<any>[] {
    if (match) {
      return values.filter(value => match.includes(value.data[property]));
    } else {
      return values;
    }

  }

}
