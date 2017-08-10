/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 7, 2017
 */

import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from './auth-http.service';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HatApiV2Service {

  constructor(private authHttp: AuthHttp) { }

  getRecords(source: string, namespace: string, limit?: number): Observable<HatRecord[]> {
    const url = `/api/v2/data/${source}/${namespace}`;
    const queryParams = new URLSearchParams();

    queryParams.append('orderBy', 'date');
    queryParams.append('ordering', 'descending');

    if (limit) {
      queryParams.append('take', limit.toString());
    }

    return this.authHttp.get(url, { search: queryParams })
      .map((res: Response) => {
        return <HatRecord[]>res.json();
      });
  }

}
