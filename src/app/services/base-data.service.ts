/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Subject, Observable, ReplaySubject } from "rxjs";
import { HatApiService } from "./hat-api.service";
import { UiStateService } from "./ui-state.service";
import * as _ from 'lodash';
import { DataTable } from "../shared/interfaces/data-table.interface";
import * as moment from "moment";

export abstract class BaseDataService<T> {
  private _data$: ReplaySubject<Array<T>> = <ReplaySubject<Array<T>>>new ReplaySubject(1);
  public hat: HatApiService;
  public uiSvc: UiStateService;
  public store: {
    data: Array<T>;
    tableId: number;
    idMapping?: { [s: string]: number; };
  };

  private oldestRecordTimestamp: string = null;
  private _loading$: Subject<boolean> = <Subject<boolean>>new Subject();

  constructor(hat: HatApiService, uiSvc: UiStateService) {
    this.hat = hat; this.uiSvc = uiSvc;
    this.store = {
      data: [],
      tableId: null
    };
  }

  get data$(): Observable<Array<T>> {
    return this._data$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  ensureTableExists(name: string, source: string): void {
    this.uiSvc.tables$.subscribe((tables: DataTable[]) => {
      const foundTable = tables.find((table: DataTable) => table.name === name && table.source === source);
      if (foundTable) {
        this.store.tableId = foundTable.id;
        this.getRecentData();
      }
    });
  }

  getRecentData(failedAttempts: number = 0): void {
    if (this.store.data.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this._loading$.next(true);
      this.hat.getValuesWithLimit(this.store.tableId)
        .map((rawData: Array<any>) => {
          if (rawData.length > 0) {
            this.oldestRecordTimestamp = moment(rawData[rawData.length - 1].lastUpdated).format("X");
          }

          let typeSafeData: Array<T> = rawData.map(this.mapData);
          return _.uniqBy(typeSafeData, "id");
        })
        .subscribe((data: Array<T>) => {
          this.store.data = data;
          this.pushToStream();
        });
    } else if (failedAttempts <= 10) {
      Observable.timer(100).subscribe(() => this.getRecentData(++failedAttempts));
    }
  }

  getMoreData(fetchRecordCount: number = 100, totalRecordCount: number = 500): void {
    if (this.oldestRecordTimestamp) {
      this._loading$.next(true);
      this.hat.getValuesWithLimit(this.store.tableId, fetchRecordCount, this.oldestRecordTimestamp)
        .map((rawData: Array<any>) => {
          if (rawData.length > 0) {
            this.oldestRecordTimestamp = moment(rawData[rawData.length - 1].lastUpdated).format("X");
          }

          let typeSafeData: Array<T> = rawData.map(this.mapData);
          return _.uniqBy(typeSafeData, "id");
        })
        .subscribe((data: Array<T>) => {
          this.store.data = this.store.data.concat(data);

          if (this.store.data.length < totalRecordCount) {
            this.pushToStream();
          }

          // if (this.store.data.length < totalRecordCount && data.length > 0) {
          //   this.getMoreData(fetchRecordCount, totalRecordCount);
          // }
        });
    }
  }

  getTimeIntervalData(startTime: string, endTime: string): void {
    this._loading$.next(true);
    this.hat.getValuesWithLimit(this.store.tableId, 5000, endTime, startTime)
      .map((rawData: Array<any>) => {
        let typeSafeData: Array<T> = rawData.map(this.mapData);
        return _.uniqBy(typeSafeData, "id");
      })
      .subscribe((data: Array<T>) => {
        this.store.data = this.store.data.concat(data);

        this.pushToStream();
      });
  }

  abstract mapData(rawDataItem: any): T

  pushToStream(): void {
    this._loading$.next(false);
    this._data$.next(this.store.data);
  }

}
