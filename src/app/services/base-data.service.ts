/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Subject, Observable } from "rxjs";
import { HatApiService } from "./hat-api.service";
import { uniqBy } from 'lodash';
import {UserService} from "./user.service";
import {User} from "../shared/interfaces/user.interface";

export abstract class BaseDataService<T> {
  private _data$: Subject<Array<T>> = <Subject<Array<T>>>new Subject();
  public hat: HatApiService;
  public userSvc: UserService;
  public store: {
    data: Array<T>;
    tableId: number;
    idMapping?: { [s: string]: number; };
  };

  constructor(hat: HatApiService, userSvc: UserService) {
    this.hat = hat; this.userSvc = userSvc;
    this.store = {
      data: [],
      tableId: null
    };
  }

  get data$(): Observable<Array<T>> {
    return this._data$.asObservable();
  }

  registerUser$Listener(name: string, source: string): void {
    this.userSvc.user$.subscribe((user: User) => {
      if (user.authenticated) {
        this.ensureTableExists(name, source);
      }
    });
  }

  getRecentData(failedAttempts: number = 0): void {
    if (this.store.data.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this.hat.getValuesWithLimit(this.store.tableId)
        .map((rawData: Array<any>) => {
          let typeSafeData = rawData.map(this.mapData);
          return uniqBy(typeSafeData, "id");
        })
        .subscribe((data: Array<T>) => {
          this.store.data = data;

          this.pushToStream();
        });
    } else if (failedAttempts <= 10) {
      Observable.timer(75).subscribe(() => this.getRecentData(++failedAttempts));
    }
  }

  abstract mapData(rawDataItem: any): T

  ensureTableExists(name: string, source: string): void {
    this.hat.getTable(name, source)
      .subscribe(table => {
        if (table === "Not Found") {
          console.log(`${name} of ${source} table does not exist.`);
        } else {
          this.store.tableId = table.id;
        }
      })
  }

  pushToStream(): void {
    return this._data$.next(this.store.data);
  }

}
