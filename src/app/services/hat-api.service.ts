import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const HAT_PORT = 8080;

@Injectable()
export class HatApiService {
  private _token: string;
  private _baseUrl: string;
  private _headers: Headers;

  constructor(private _http: Http) {}

  validateToken(domain: string, token: string) {
    this._baseUrl = 'http://' + domain + ':' + HAT_PORT;
    this._token = token;
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
    this._headers.append('X-Auth-Token', this._token);

    const url = this._baseUrl + '/users/access_token/validate';

    return this._http.get(url, { headers: this._headers }).map(res => res.json());
  }

  getTable(name: string, source: string): Observable<any> {
    const url = this._baseUrl + '/data/table';
    let query: URLSearchParams = new URLSearchParams();
    query.append('name', name);
    query.append('source', source);

    return this._http.get(url, { headers: this._headers, search: query })
      .map(res => res.json().id)
      .flatMap(tableId => this.getTableValues(tableId));
  }

  getTableValues(tableId: number): Observable<any> {
    const url = this._baseUrl + '/data/table/' + tableId + '/values';

    return this._http.get(url, { headers: this._headers })
      .map(res => res.json())
      .map(body => this.transform(body));
  }

  getDataDebit(uuid: string) {
    const url = this._baseUrl + '/dataDebit/' + uuid + '/values';
    return this._http.get(url, { headers: this._headers })
      .map(res => res.json());
  }

  updateDataDebit(uuid: string, state: string): Observable<any> {
    const url = this._baseUrl + '/directDebit/' + uuid + '/' + state;

    return this._http.put(url, {}, { headers: this._headers });
  }

  private transform(raw: Array<any>) {
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
}
