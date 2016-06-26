import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MarketSquareService {
  private _baseUrl: string;
  private _headers: Headers;

  constructor(private _http: Http) {
    this._baseUrl = 'https://marketsquare.hubofallthings.net/api';
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }

  getOffer(): Observable<any> {
    const url = this._baseUrl + '/offers';
    return this._http.get(url, { headers: this._headers })
        .map(res => res.json());
  }

}
