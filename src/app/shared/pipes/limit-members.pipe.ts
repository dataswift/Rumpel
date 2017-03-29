/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitMembers'
})
export class LimitMembersPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    if (!value) {
      return value;
    }

    return args ? value.slice(0, args) : value.slice(0, 5);
  }
}
