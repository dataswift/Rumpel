/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Moment, isMoment } from 'moment/moment';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, dateFormatting: string = 'DD/MM/YYYY, h:mm a'): Moment {
    if (!value) {
      return null;
    }

    if (!isMoment(value)) {
      value = moment(value);
    }

    return value.format(dateFormatting);
  }

}
