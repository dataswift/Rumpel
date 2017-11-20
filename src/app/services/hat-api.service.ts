/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { AuthHttp } from './auth-http.service';
import { Observable } from 'rxjs/Observable';
import { DataDebit } from '../shared/interfaces/index';
import { User } from '../user/user.interface';
import { isMoment } from 'moment/moment';
import moment from 'moment/moment';

@Injectable()
export class HatApiService {

  static stringify(value: any): string {
    if (typeof value === 'string') {
      return value;
    } else if (value === null) {
      return '';
    } else if (isMoment(value)) {
      return value.format();
    } else if (Array.isArray(value)) {
      return value.join(',');
    } else {
      return '' + value;
    }
  }

  constructor(private http: Http,
              private authHttp: AuthHttp) {}

  // validateToken(domain: string, token: string) {
  //   const url = `//${domain}/users/access_token/validate`;
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('X-Auth-Token', token);
  //
  //   return this._http.get(url, { headers: headers, body: '' }).map(res => res.json());
  // }

  /* User authentication management methods */

  login(username: string, password: string): Observable<User> {
    const headers = new Headers({
      username: encodeURIComponent(username),
      password: encodeURIComponent(password)
    });

    return this.http.get('users/access_token', { headers: headers, body: '' })
      .map((res: Response) => {
        const token = res.json().accessToken;

        return this.authHttp.setToken(token);
      });
  }

  loginWithToken(token: string): User {
    return this.authHttp.setToken(token);
  }

  hatLogin(name: string, redirect: string): Observable<any> {
    const queryParams = new URLSearchParams();
    queryParams.append('name', name);
    queryParams.append('redirect', redirect);

    return this.authHttp.get('/control/v2/auth/hatlogin', { search: queryParams })
      .map((res: Response) => res.json()['message']);
  }

  recoverPassword(body: any): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post('/control/v2/auth/passwordReset', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  changePassword(body: any): Observable<any> {
    return this.authHttp.post('/control/v2/auth/password', body)
      .map((res: Response) => res.json());
  }

  resetPassword(resetToken: string, body: any): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post('/control/v2/auth/passwordreset/confirm/' + resetToken, body, { headers: headers })
      .map((res: Response) => res.json());
  }

  /* Application authentication management methods */

  getApplicationToken(name: string, resource: string): Observable<string> {
    const query: URLSearchParams = new URLSearchParams();
    query.append('name', name);
    query.append('resource', resource);

    return this.authHttp.get('/users/application_token', { search: query })
      .map(res => res.json().accessToken);
  }

  /* Data table methods */

  getTableList(): Observable<any> {
    return this.authHttp.get('/data/sources').map(res => res.json());
  }

  // getDataSources(): Observable<any> {
  //   const url = this._baseUrl + '/data/sources';
  //
  //   return this._http.get(url, { headers: this._headers, body: '' })
  //     .map(res => res.json());
  // }

  getTable(name: string, source: string): Observable<any> {
    const query: URLSearchParams = new URLSearchParams();
    query.append('name', name);
    query.append('source', source);

    return this.authHttp.get('/data/table', { search: query })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 404) {
          return Observable.of('Not Found');
        } else if (e.status === 403) {
          return Observable.of('Forbidden');
        }
      });
  }

  getModel(tableId: number): Observable<any> {
    return this.authHttp.get(`/data/table/${tableId}`).map(res => res.json());
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
    return this.authHttp.post('/data/table', model)
      .map(res => res.json())
      .map(rawModel => {
        return {
          id: rawModel.id,
          mapping: this.mapDataSource(rawModel, rawModel.name)
        };
      });
  }

  /* Data record methods */

  getAllValuesOf(name: string, source: string, startTime?: string): Observable<any> {
    return this.getTable(name, source)
      .flatMap(table => {
        if (table === 'Not Found' || table === 'Forbidden') {
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

  postRecord(obj: any, hatIdMapping: any, prefix: string = 'default'): Observable<any> {
    const hatFormattedObj = this.createRecord(obj, hatIdMapping, prefix);

    return this.authHttp.post('/data/record/values', hatFormattedObj)
        .map(res => res.json());
  }

  deleteRecord(id: number) {
    return this.authHttp.delete(`/data/record/${id}`)
      .map(res => res.json());
  }

  getValues(tableId: number, startTime: string = '0', pretty: boolean = false): Observable<any> {
    const query: URLSearchParams = new URLSearchParams();
    query.append('starttime', startTime);
    if (pretty) {
      query.append('pretty', pretty.toString());
    }

    const requestObservable = this.authHttp.get(`/data/table/${tableId}/values`, { search: query })
      .map(res => res.json());

    if (pretty) {
      return requestObservable;
    } else {
      return requestObservable.map(table => this.transformRecord(table));
    }
  }

  getValuesWithLimit(tableId: number, limit: number = 50, endtime: string = null, starttime: string = null): Observable<any> {
    const query: URLSearchParams = new URLSearchParams();
    query.append('pretty', 'true');
    query.append('limit', limit.toString());
    query.append('starttime', starttime || '0');

    if (endtime) {
      query.append('endtime', endtime);
    }

    return this.authHttp.get(`/data/table/${tableId}/values`, { search: query })
      .map(res => res.json());
  }

  /* Data debit methods */

  getSlimDataDebit(uuid: string): Observable<DataDebit> {
    return this.authHttp.get(`/dataDebit/${uuid}`).map(res => res.json());
  }

  getDataDebit(uuid: string) {
    const query: URLSearchParams = new URLSearchParams();
    query.append('limit', '0');
    query.append('starttime', '0');

    return this.authHttp.get(`/dataDebit/${uuid}/values`, { search: query })
      .map(res => res.json())
      .map(debit => this.transformDataDebit(debit));
  }

  getAllDataDebits() {
    return this.authHttp.get('/dataDebit').map(res => res.json());
  }

  updateDataDebit(uuid: string, action: string): Observable<any> {
    return this.authHttp.get(`/api/v2/data-debit/${uuid}/${action}`);
  }

  /* HAT Public API methods */

  getPublicData(endpoint: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`/api/${endpoint}`, { headers: headers, body: '' })
      .map(res => res.json())
      .catch(err => {
        console.warn(`Could not access public data of the current HAT.
                      Reason: ${err}`);

        return Observable.of(endpoint === 'profile' ? { 'public': false } : []);
      });
  }

  /* System status methods */

  getAccountStatus(): Observable<any> {
    return this.authHttp.get('/api/v2/system/status')
      .map((res: Response) => res.json());
  }

  /* Private helper methods */

  private createRecord(obj: any, hatIdMapping: any, prefix: string) {
    if (Array.isArray(obj)) {
      return obj.map(record => {
        return {
          record: { name: new Date() },
          values: this.createValue(record, hatIdMapping, prefix)
        };
      });
    } else {
      return [{
        record: { name: new Date() },
        values: this.createValue(obj, hatIdMapping, prefix)
      }];
    }
  }

  private createValue(obj: any, hatIdMapping: any, prefix: string = 'default') {
    return Object.keys(obj).reduce((acc, key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null && !isMoment(obj[key]) && !Array.isArray(obj[key])) {
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
    const mapping = {};

    table.fields.reduce((acc, field) => {
      acc[prefix + '_' + field.name] = field.id;

      return acc;
    }, mapping);

    if (table.subTables) {
      const mappedSubTables = table.subTables.reduce((acc, tableNode) => {
        const mappedTable = this.mapDataSource(tableNode, prefix + '_' + tableNode.name);
        Object.assign(acc, mappedTable);

        return acc;
      }, mapping);
    }

    return mapping;
  }

  private transformDataDebit(rawDebit) {
    const dataGroups = rawDebit.bundleContextless.dataGroups;

    const dataGroupsNames = Object.keys(dataGroups);

    const mappedDataGroups = dataGroupsNames.map(groupName => {
      return {
        name: groupName,
        data: dataGroups[groupName].map(group => {
          return {
            name: group.name,
            data: this.transformRecord(group.data)
          };
        })
      };
    });

    const processedDebit = {
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
    const values = {};
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

}
