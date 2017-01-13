/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceChars'
})
export class ReplaceCharsPipe implements PipeTransform {

  transform(str: string, args?: any): string {
    if (str) {
      return str.replace(/_/g, " ");
    } else {
      return str;
    }
  }

}
