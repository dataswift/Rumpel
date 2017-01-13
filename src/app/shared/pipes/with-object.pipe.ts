/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Node } from '../interfaces';

@Pipe({
  name: 'withObject'
})
export class WithObjectPipe implements PipeTransform {

  transform(value: any, args?: string[]): any {
    let keys = [];
    for (let key in value) {
      if (typeof value[key] === 'string') {
        keys.push(new Node(key, value[key], null));
      } else {
        keys.push(new Node(key, null, value[key]));
      }
    }
    return keys;
  }

}
