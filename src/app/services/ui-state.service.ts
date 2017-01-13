/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { HatApiService } from './hat-api.service';
import { AuthService } from './auth.service';

@Injectable()
export class UiStateService {
  private state$: Subject<any>;
  private state: { dataSources: Array<string>; dataTypes: Array<string> };
  private defaultMenu: Array<any>;

  constructor(private hat: HatApiService, private auth: AuthService) {
    this.state = { dataSources: [], dataTypes: [] }
    this.state$ = <Subject<any>>new Subject();

    this.auth.auth$
      .flatMap(authenticated => {
        if (authenticated)
          return this.hat.getDataSources()
      })
      .subscribe(dataSources => {
        for (let dataSource of dataSources) {
          if (!(~this.state.dataSources.indexOf(dataSource.source))) {
            this.state.dataSources.push(dataSource.source);
          }

          if (!(~this.state.dataTypes.indexOf(dataSource.name))) {
            this.state.dataTypes.push(dataSource.name);
          }
        }

        localStorage.setItem('state', JSON.stringify(this.state));
        this.state$.next(this.state);
    });
  }

  getState$() {
    return this.state$.asObservable();
  }

  fetchState() {
    this.state$.next(this.state);
  }

  getDataTypes() {
    const stateStr = localStorage.getItem('state');
    const state = JSON.parse(stateStr);
    return state.dataTypes;
  }

}
