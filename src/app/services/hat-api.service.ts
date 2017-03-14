/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { DataDebit, User } from '../shared/interfaces/index';
import * as moment from 'moment';

@Injectable()
export class HatApiService {
  private _token: string;
  private _domain: string;
  private _baseUrl: string;
  private _headers: Headers;
  private _userSub: Subscription;

  constructor(private _http: Http) {}

  get hatDomain() {
    return this._domain;
  }

  injectUserSubscription(user$: Observable<User>) {
    this._userSub = user$.subscribe((user: User) => {
      this._baseUrl = '//' + user.iss;
      this._domain = user.iss;
      this._token = user.token;

      this._headers = new Headers();
      this._headers.append("Content-Type", "application/json");
      this._headers.append("X-Auth-Token", user.token);
    });
  }

  validateToken(domain: string, token: string) {
    const url = `//${domain}/users/access_token/validate`;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Auth-Token", token);

    return this._http.get(url, { headers: headers, body: '' }).map(res => res.json());
  }

  getApplicationToken(name: string, resource: string): Observable<string> {
    let query: URLSearchParams = new URLSearchParams();
    query.append('name', name);
    query.append('resource', resource);

    return this._http.get("/users/application_token", { headers: this._headers, search: query, body: '' })
      .map(res => res.json().accessToken);
  }

  getDataSources(): Observable<any> {
    const url = this._baseUrl + '/data/sources';

    return this._http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json());
  }

  getAllValuesOf(name: string, source: string, startTime?: string): Observable<any> {
    return this.getTable(name, source)
      .flatMap(table => {
        if (table === "Not Found") {
          return Observable.of([]);
        } else {
          if (name === 'profile' || name === 'photos' || name === 'metadata' || name === 'profile_picture') {
            return this.getValues(table.id, startTime, false);
          } else {
            return this.getValues(table.id, startTime, true);
          }
        }
      });
  }

  getTable(name: string, source: string): Observable<any> {
    const url = this._baseUrl + '/data/table';
    let query: URLSearchParams = new URLSearchParams();
    query.append('name', name);
    query.append('source', source);

    return this._http.get(url, { headers: this._headers, search: query, body: '' })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 404) return Observable.of("Not Found");
      });
  }

  getModel(tableId: number): Observable<any> {
    const url = this._baseUrl + '/data/table/' + tableId;

    return this._http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json());
  }

  getModelMapping(tableId: number): Observable<any> {
    return this.getModel(tableId)
      .map(rawModel => {
        return {
          id: rawModel.id,
          mapping: this.mapDataSource(rawModel, rawModel.name)
        };
      });
  }

  postModel(model: any): Observable<any> {
    const url = this._baseUrl + '/data/table';

    return this._http.post(url, model, { headers: this._headers })
      .map(res => res.json())
      .map(rawModel => {
        return {
          id: rawModel.id,
          mapping: this.mapDataSource(rawModel, rawModel.name)
        };
      });
  }

  postRecord(obj: any, hatIdMapping: any, prefix: string = 'default'): Observable<any> {
    const url = this._baseUrl + '/data/record/values';
    const hatFormattedObj = this.createRecord(obj, hatIdMapping, prefix);

    return this._http.post(url, hatFormattedObj, { headers: this._headers })
        .map(res => res.json());
  }

  deleteRecord(id: number) {
    const url = this._baseUrl + '/data/record/' + id;

    return this._http.delete(url, { headers: this._headers })
      .map(res => res.json());
  }

  getValues(tableId: number, startTime: string = '0', pretty: boolean = false): Observable<any> {
    const url = this._baseUrl + '/data/table/' + tableId + '/values';

    let query: URLSearchParams = new URLSearchParams();
    query.append('starttime', startTime);
    if (pretty) {
      query.append('pretty', pretty.toString());
    }

    let requestObservable = this._http.get(url, { headers: this._headers , search: query, body: '' })
      .map(res => res.json());

    if (pretty) {
      return requestObservable;
    } else {
      return requestObservable.map(table => this.transformRecord(table));
    }
  }

  getValuesWithLimit(tableId: number, limit: number = 50, endtime: string = null, starttime: string = null): Observable<any> {
    const url = this._baseUrl + '/data/table/' + tableId + '/values';

    let query: URLSearchParams = new URLSearchParams();
    query.append('pretty', 'true');
    query.append('limit', limit.toString());
    query.append('starttime', starttime || '0');

    if (endtime) {
      query.append('endtime', endtime);
    }

    return this._http.get(url, { headers: this._headers , search: query, body: '' })
        .map(res => res.json());
  }

  getSlimDataDebit(uuid: string): Observable<DataDebit> {
    const url = this._baseUrl + '/dataDebit/' + uuid;
    return this._http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json())
  }

  getDataDebit(uuid: string) {
    const url = this._baseUrl + '/dataDebit/' + uuid + '/values?limit=0&starttime=0';
    return this._http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json())
      .map(debit => this.transformDataDebit(debit));
  }

  getAllDataDebits() {
    const url = this._baseUrl + '/dataDebit';
    return this._http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json());
  }

  updateDataDebit(uuid: string, state: string): Observable<any> {
    const url = this._baseUrl + '/dataDebit/' + uuid + '/' + state;

    return this._http.put(url, {}, { headers: this._headers });
  }

  static stringify(value: any): string {
    if (typeof value === 'string') {
      return value;
    } else if (value === null) {
      return "";
    } else if (moment.isMoment(value)) {
      return value.format();
    } else if (Array.isArray(value)) {
      return value.join(",");
    } else {
      return "" + value;
    }
  }

  private createRecord(obj: any, hatIdMapping: any, prefix: string) {
    if (Array.isArray(obj)) {
      return obj.map(record => {
        return {
          record: { name: new Date() },
          values: this.createValue(record, hatIdMapping, prefix)
        }
      });
    } else {
      return [{
        record: { name: new Date() },
        values: this.createValue(obj, hatIdMapping, prefix)
      }]
    }
  }

  private createValue(obj: any, hatIdMapping: any, prefix: string = 'default') {
    return Object.keys(obj).reduce((acc, key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null && !moment.isMoment(obj[key]) && !Array.isArray(obj[key])) {
        const subTreeValues = this.createValue(obj[key], hatIdMapping, prefix + '_' + key);
        acc = acc.concat(subTreeValues);
      } else {
        acc.push({
          value: HatApiService.stringify(obj[key]),
          field: {
            id: hatIdMapping[prefix + '_' + key],
            name: key
          }
        });
      }

      return acc;
    }, []);
  }

  private mapDataSource(table: any, prefix: string = 'default') {
    var mapping = {};

    table.fields.reduce((acc, field) => {
      acc[prefix + '_' + field.name] = field.id;
      return acc;
    }, mapping);

    if (table.subTables) {
      const mappedSubTables = table.subTables.reduce((acc, table) => {
        const mappedTable = this.mapDataSource(table, prefix + '_' + table.name);
        Object.assign(acc, mappedTable);
        return acc;
      }, mapping);
    }

    return mapping;
  }

  private transformDataDebit(rawDebit) {
    let dataGroups = rawDebit.bundleContextless.dataGroups;

    let dataGroupsNames = Object.keys(dataGroups);

    let mappedDataGroups = dataGroupsNames.map(groupName => {
      return {
        name: groupName,
        data: dataGroups[groupName].map(group => {
          return {
            name: group.name,
            data: this.transformRecord(group.data)
          }
        })
      }
    });

    let processedDebit: DataDebit = {
      dateCreated: moment(rawDebit.dateCreated),
      startDate: moment(rawDebit.startDate),
      endDate: moment(rawDebit.endDate),
      lastUpdated: moment(rawDebit.lastUpdated),
      enabled: rawDebit.enabled,
      name: rawDebit.name,
      price: rawDebit.price,
      rolling: rawDebit.rolling,
      sell: rawDebit.sell,
      key: rawDebit.key,
      dataToShare: mappedDataGroups
    };

    return processedDebit;
  }

  private transformRecord(raw: Array<any>) {
    return raw.map((record) => {
      return this.processNode(record.tables[0]);
    });
  }

  private processNode(node) {
    var values = {};
    node.fields.reduce((acc, field) => {
      if (field.values) {
        acc[field.name] = field.values[0].value;
      } else {
        acc[field.name] = null;
      }
      return acc;
    }, values);

    if (node.subTables) {
      node.subTables.reduce((acc, table) => {
        acc[table.name] = this.processNode(table);

        return acc;
      }, values);
    }

    return values;
  }

  login(username: string, password: string) {
    let headers = new Headers();
    headers.append("username", username);
    headers.append("password", password);

    return this._http.get(`//${window.location.hostname}:9000/users/access_token`, { headers: headers, body: '' })
      .map(res => res.json().accessToken);
  }

  /* HAT Public API methods */

  getPublicData(endpoint: string): Observable<any> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http.get(`//${window.location.hostname}:9000/api/${endpoint}`, { headers: headers, body: '' })
      .map(res => res.json())
      .catch(err => {
        console.warn(`Could not access public data of the current HAT.
                      Reason: ${err}`);
        return Observable.of(endpoint === "profile" ? { "public": false } : []);
      });
  }
}
