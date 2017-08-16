/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeChars'
})
export class RemoveCharsPipe implements PipeTransform {

  transform(str: string, charToRemove: string): string {
    if (str && charToRemove) {
      return str.replace(charToRemove, '');
    } else {
      return str;
    }
  }

}
