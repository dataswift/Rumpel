/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Observable, Subject, ReplaySubject, Subscription } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';

import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { EndpointQuery, Filter } from '../shared/interfaces/bundle.interface';

export abstract class BaseDataService<T> {
  private _data$: ReplaySubject<HatRecord<T>[]> = <ReplaySubject<HatRecord<T>[]>>new ReplaySubject(1);
  public hat: HatApiService;
  private store: { data: HatRecord<T>[]; } = { data: [] };

  private RECORDS_PER_REQUEST = 250;
  private drop = 0;
  private namespace: string;
  private endpoint: string;
  private orderBy: string;

  private userSub: Subscription;
  private _loading$: Subject<boolean> = <Subject<boolean>>new Subject();

  constructor(hat: HatApiService, authSvc: AuthService, namespace: string, endpoint: string, orderBy: string) {
    this.hat = hat; this.namespace = namespace; this.endpoint = endpoint; this.orderBy = orderBy;
    this.clearLocalStore();

    this.userSub = authSvc.auth$
      .pipe(filter(isAuthenticated => isAuthenticated === false))
      .subscribe(_ => this.clearLocalStore());
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
      .pipe(map(data => data.length > 0));
  }

  getInitData(take: number = this.RECORDS_PER_REQUEST): void {
    if (this.store.data.length > 0) {
      this.pushToStream();
    } else {
      this.hat.getDataRecords(this.namespace, this.endpoint, take, this.orderBy)
        .pipe(map((rawData: HatRecord<any>[]) => rawData.map(this.coerceType)))
        .subscribe((data: HatRecord<T>[]) => {
          this.store.data = this.store.data.concat(data);
          this.drop = this.drop + data.length;
          this.pushToStream();
        });
    }
  }

  getMoreData(take: number = this.RECORDS_PER_REQUEST, repeatUntilMinRecordNumber?: number): void {
    this.hat.getDataRecords(this.namespace, this.endpoint, take, this.orderBy, this.drop)
      .pipe(map((rawData: HatRecord<any>[]) => rawData.map(this.coerceType)))
      .subscribe((data: HatRecord<T>[]) => {
        this.store.data = this.store.data.concat(data);
        this.drop = this.drop + data.length;
        this.pushToStream();

        if (repeatUntilMinRecordNumber && this.drop < repeatUntilMinRecordNumber && data.length > 0) {
          this.getMoreData(take, repeatUntilMinRecordNumber);
        }
      });
  }

  save(recordValue: T): Observable<HatRecord<T>> {
    return this.hat.createRecord(this.namespace, this.endpoint, recordValue).pipe(
      map(this.coerceType),
      tap((record: HatRecord<T>) => {
        this.store.data.unshift(record);
        this.drop += 1;
        this.pushToStream();
      })
    );
  }

  update(recordValue: HatRecord<T>): Observable<HatRecord<T>> {
    return this.hat.updateRecord(recordValue).pipe(
      map(this.coerceType),
      tap((updatedRecord: HatRecord<T>) => {
        const updatedRecordIndex = this.store.data
          .findIndex((dataPoint) => dataPoint.recordId === updatedRecord.recordId);

        if (updatedRecordIndex > -1) {
          this.store.data[updatedRecordIndex] = updatedRecord;
          this.pushToStream();
        }
      })
    );
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

    this.hat.proposeNewDataEndpoint(combinatorName, [endpointQuery]).pipe(
      mergeMap((resCode: number) => this.hat.getCombinatorRecords(combinatorName, this.orderBy, 2 * this.RECORDS_PER_REQUEST)))
      .pipe(map((rawData: HatRecord<any>[]) => rawData.map(this.coerceType)))
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
}
