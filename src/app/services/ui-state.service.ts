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
import { UserService } from './user.service';
import {User} from "../shared/interfaces/user.interface";

@Injectable()
export class UiStateService {
  private state$: Subject<any>;
  private state: { dataSources: Array<string>; dataTypes: Array<string> };

  constructor(private hat: HatApiService, private userSvc: UserService) {
    this.state = { dataSources: [], dataTypes: [] };
    this.state$ = <Subject<any>>new Subject();

    this.userSvc.user$
      .flatMap((user: User) => {
        if (user.authenticated) {
          return this.hat.getDataSources()
        } else {
          return Observable.of([]);
        }
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
