/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { HatApiService } from './hat-api.service';
import { UserService } from './user.service';
import {User} from "../shared/interfaces/user.interface";
import {DataTable} from "../shared/interfaces/data-table.interface";

@Injectable()
export class UiStateService {
  private state$: ReplaySubject<DataTable[]>;

  constructor(private hat: HatApiService, private userSvc: UserService) {
    this.state$ = <ReplaySubject<Array<DataTable>>>new ReplaySubject();

    this.userSvc.user$
      .flatMap((user: User) => {
        if (user.authenticated) {
          return this.hat.getDataSources();
        } else {
          return Observable.throw("User is not authenticated.");
        }
      })
      .subscribe(
        rawDataTables => {
          const dataTables: Array<DataTable> = rawDataTables.map(table => {
            return {
              name: table.name,
              source: table.source,
              id: table.id
            };
          });

          this.state$.next(dataTables);
        },
        error => console.log(error));
  }

  get tables$(): Observable<DataTable[]> {
    return this.state$.asObservable();
  }

}
