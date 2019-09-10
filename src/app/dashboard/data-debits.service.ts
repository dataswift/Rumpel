/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io>
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../core/services/hat-api.service';
import { Observable } from 'rxjs';
import { DataDebit } from '../data-management/data-debit.interface';

@Injectable()
export class DataDebitService {

  constructor(private hat: HatApiService) {}

  loadAllDataDebits(): Observable<DataDebit[]> {
    return this.hat.getAllDataDebits();
  }

}
