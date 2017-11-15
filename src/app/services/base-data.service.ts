/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Subject, Observable, ReplaySubject } from 'rxjs/Rx';
import { HatApiV2Service } from './hat-api-v2.service';
import { UiStateService } from './ui-state.service';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { EndpointQuery, Filter } from '../shared/interfaces/bundle.interface';

export abstract class BaseDataService<T> {
  private _data$: ReplaySubject<HatRecord<T>[]> = <ReplaySubject<HatRecord<T>[]>>new ReplaySubject(1);
  public hat: HatApiV2Service;
  public uiSvc: UiStateService;
  private store: { data: HatRecord<T>[]; } = { data: [] };

  private RECORDS_PER_REQUEST = 250;
  private drop = 0;
  private namespace: string;
  private endpoint: string;
  private orderBy: string;
  private _loading$: Subject<boolean> = <Subject<boolean>>new Subject();

  constructor(hat: HatApiV2Service, uiSvc: UiStateService, namespace: string, endpoint: string, orderBy: string) {
    this.hat = hat; this.uiSvc = uiSvc; this.namespace = namespace; this.endpoint = endpoint; this.orderBy = orderBy;
    this.clearLocalStore();

    this.uiSvc.auth$.subscribe((authenticated: boolean) => {
      if (authenticated === false) {
        this.clearLocalStore();
      }
    });
  }

  get data$(): Observable<HatRecord<T>[]> {
    return this._data$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get dataListExhausted(): boolean {
    return this.drop % this.RECORDS_PER_REQUEST !== 0;
  }

  checkTableExists(): Observable<boolean> {
    return this.hat.getDataRecords(this.namespace, this.endpoint, 1)
      .map(data => data.length > 0)
  }

  getInitData(take: number = this.RECORDS_PER_REQUEST): void {
    if (this.store.data.length > 0) {
      this.pushToStream();
    } else {
      this.hat.getDataRecords(this.namespace, this.endpoint, take, this.orderBy)
        .map((rawData: HatRecord<any>[]) => rawData.map(this.coerceType))
        .subscribe((data: HatRecord<T>[]) => {
          this.store.data = this.store.data.concat(data);
          this.drop = this.drop + data.length;
          this.pushToStream();
        });
    }
  }

  getMoreData(take: number = this.RECORDS_PER_REQUEST, repeatUntilMinRecordNumber?: number): void {
    this.hat.getDataRecords(this.namespace, this.endpoint, take, this.orderBy, this.drop)
      .map((rawData: HatRecord<any>[]) => rawData.map(this.coerceType))
      .subscribe((data: HatRecord<T>[]) => {
        this.store.data = this.store.data.concat(data);
        this.drop = this.drop + data.length;
        this.pushToStream();

        if (repeatUntilMinRecordNumber && this.drop < repeatUntilMinRecordNumber) {
          this.getMoreData(take, repeatUntilMinRecordNumber);
        }
      });
  }

  save(recordValue: T): Observable<HatRecord<T>> {
    return this.hat.createRecord(this.endpoint, recordValue)
      .map(this.coerceType)
      .do((record: HatRecord<T>) => {
        this.store.data.unshift(record);
        this.drop += 1;
        this.pushToStream();
      });
  }

  update(recordValue: HatRecord<T>): Observable<HatRecord<T>> {
    return this.hat.updateRecord(recordValue)
      .map(this.coerceType)
      .do((updatedRecord: HatRecord<T>) => {
        const updatedRecordIndex = this.store.data
          .findIndex((dataPoint) => dataPoint.recordId === updatedRecord.recordId);

        if (updatedRecordIndex > -1) {
          this.store.data[updatedRecordIndex] = updatedRecord;
          this.pushToStream();
        }
      });
  }

  delete(recordValue: HatRecord<T>): void {
    this.hat.deleteRecords([recordValue.recordId])
      .subscribe((responseCode: number) => {
        const deletedRecordIndex = this.store.data
          .findIndex((dataPoint) => dataPoint.recordId === recordValue.recordId);

        if (deletedRecordIndex > -1) {
          this.store.data.splice(deletedRecordIndex, 1);
          this.pushToStream();
        }
      })
  }

  getTimeIntervalData(filters: Filter[]): void {
    const combinatorName = `${this.namespace}/time-bound-${this.endpoint}`;
    const endpointQuery: EndpointQuery = {
      endpoint: `${this.namespace}/${this.endpoint}`,
      filters: filters
    };

    this.hat.proposeNewDataEndpoint(combinatorName, [endpointQuery])
      .flatMap((resCode: number) => this.hat.getCombinatorRecords(combinatorName, this.RECORDS_PER_REQUEST))
      .map((rawData: HatRecord<any>[]) => rawData.map(this.coerceType))
      .subscribe((data: HatRecord<T>[]) => {
        this.store.data = data;
        this.drop = data.length;
        this.pushToStream();
      });
  }

  abstract coerceType(hatRecord: HatRecord<any>): HatRecord<T>

  clearLocalStore(): void {
    this.store = {
      data: []
    };

    this.pushToStream();
  }

  clearData(): void {
    this.store.data = [];
    this.pushToStream();
  }

  pushToStream(): void {
    this._loading$.next(false);
    this._data$.next(this.store.data);
  }

  pushMockDataToStream(data): void {
    this._loading$.next(false);
    this._data$.next(data);
  }

}
