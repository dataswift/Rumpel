import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MarketSquareService {
  private baseUrl: string;
  private _headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = 'https://marketsquare.hubofallthings.com/api';
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }

  getOffer(): Observable<any> {
    const url = this.baseUrl + '/offers';
    return this.http.get(url, { headers: this._headers, body: '' })
        .map(res => res.json())
        .map(offers => {
          const validOffers = offers.filter(offer => offer.offer.status === 'approved' || offer.offer.status === 'satisfied');
          return validOffers.sort((a, b) => b.offer.rating.up - a.offer.rating.up);
        });
  }

  getDataPlugs(): Observable<any> {
    const url = this.baseUrl + '/dataplugs';
    return this.http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json());
  }

}
