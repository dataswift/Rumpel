/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HatApiService } from './hat-api.service';
import { Observable } from "rxjs";

@Injectable()
export class DataPlugService {
  private serviceURLmap: { [key: string]: string; } = {
    'Facebook': 'https://social-plug.hubofallthings.com/api/user/token/status',
    'Twitter': 'https://twitter-plug.hubofallthings.com/api/status'
  };

  constructor(private http: Http,
              private hat: HatApiService) { }

  getTokenInfo(plugName: string) {
    return this.hat.getApplicationToken(plugName, this.serviceURLmap[plugName])
      .flatMap(accessToken => {
        let url = this.serviceURLmap[plugName];
        let headers = new Headers();
        headers.append('X-Auth-Token', accessToken);
        headers.append('Content-Type', 'application/json');

        return this.http.get(url, { headers: headers, body: '' })
          .map(res => res.json())
      })
      .catch(err => {
        return Observable.of({ error: err.json().error });
      });
  }
}
