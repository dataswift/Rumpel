import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MarketSquareService {
  private baseUrl: string;
  private _headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = 'https://marketsquare.hubofallthings.net/api';
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }

  getOffer(): Observable<any> {
    const url = this.baseUrl + '/offers';
    return this.http.get(url, { headers: this._headers })
        .map(res => res.json());
  }

  getDataPlugs(): Observable<any> {
    const url = this.baseUrl + '/dataplugs';
    return this.http.get(url, { headers: this._headers })
      .map(res => res.json());
  }

}
