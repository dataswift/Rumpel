/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceCamelCase'
})
export class ReplaceCamelCasePipe implements PipeTransform {

  transform(str: string, args?: any): string {
    const rgx =  new RegExp('(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?=[A-Z][a-z])|(?<=\\d)(?=\\D)|(?=\\d)(?<=\\D)', 'g');
    if (str) {
      return str.replace(rgx, ' ');
    } else {
      return str;
    }
  }

}
