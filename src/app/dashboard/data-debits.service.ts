/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { Observable } from 'rxjs/Observable';
import { DataDebit } from '../shared/interfaces/data-debit.interface';

@Injectable()
export class DataDebitService {

  constructor(private hat: HatApiService) {}

  loadAllDataDebits(): Observable<DataDebit[]> {
    return this.hat.getAllDataDebits();
  }

}
