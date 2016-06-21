import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HatApiService {
  private _token: string;
  private _baseUrl: string;

  constructor(private _http: Http) {}

  validateToken(baseUrl: string, token: string) {
    this._baseUrl = baseUrl;
    this._token = token;

    const url = this._baseUrl + '/users/access_token/validate';
    const headers = new Headers({
      'X-Auth-Token': this._token,
      'Content-Type': 'application/json'
    });

    return this._http.get(url, { headers: headers }).map(res => res.json());
  }
}
