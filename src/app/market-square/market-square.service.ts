/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import {Http, Headers, URLSearchParams, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { HatApiService } from '../services/hat-api.service';

import * as moment from 'moment';
import {MSUserClaim} from "../shared/interfaces/MSUserClaim.interface";

@Injectable()
export class MarketSquareService {
  private offersStore: Array<any>;
  private applicationToken: { token: string; expires: number; };
  private jwt: JwtHelper;
  private _headers: Headers;
  public notifications: Array<any>;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private http: Http,
              private hat: HatApiService) {
    this.offersStore = [];
    this.jwt = new JwtHelper();
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }

  getValidOffers(): Observable<any> {
    return this.getAllOffers()
      .map(offers => {
        const validOffers = offers.filter(offer => {
          return moment(offer.offer.expires).isAfter() &&
            (offer.offer.status === 'approved' || offer.offer.status === 'satisfied');
        });
        return validOffers.sort((a, b) => b.offer.rating.up - a.offer.rating.up);
      });
  }

  getAllOffers(forceReload: boolean = false): Observable<any> {
    if (this.offersStore.length > 0 && forceReload === false) {
      return Observable.of(this.offersStore);
    }

    const url = this.config.market.url + '/offers';
    return this.http.get(url, { headers: this._headers, body: '' })
      .map(res => {
        this.offersStore = res.json();
        return this.offersStore;
      })
  }

  getOfferIdByDataDebitId(dataDebitId: string): Observable<string> {
    const url = this.config.market.url + '/offer';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => {
        let query = new URLSearchParams();
        query.append('dataDebitId', dataDebitId);

        return this.http.get(url, { headers: headers, search: query, body: '' })
          .map(res => res.json().offerId);
      })
      .catch(err => {
        return Observable.of("Offer not found.");
      });
  }

  getOffer(id: string): Observable<MSUserClaim> {
    const url = this.config.market.url + '/offer/' + id + '/userClaim';
    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.get(url, { headers: headers, body: '' })
      .map(res => res.json()))
      .catch(this.handleError);
  }

  claimOffer(id: string) {
    const url = this.config.market.url + '/offer/' + id + '/claim';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.get(url, { headers: headers, body: '' })
      .map(res => res.json()))
      .catch(err => {
        console.log("Failed to claim data offer on user's behalf", err);
        return Observable.of(null);
      });
  }

  getDataPlugs(): Observable<any> {
    const url = this.config.market.url + '/dataplugs';
    return this.http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json());
  }

  getNotifications(): Observable<any> {
    const url = this.config.market.url + '/notices';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.get(url, { headers: headers, body: '' }).map(res => res.json()))
      .catch(err => Observable.of({ error: "Offer not found." }));
  }

  markAsRead(notificationID: number): Observable<any> {
    const url = this.config.market.url + '/notices/' + notificationID + '/read';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.put(url, {}, { headers: headers }).map(res => res.json()))
      .catch(err => Observable.of({ error: "Offer could not be marked as read." }))
  }

  private getMarketSquareApplicationToken(): Observable<Headers> {
    if (this.applicationToken && this.applicationToken.token && this.applicationToken.expires > moment().unix()) {
      let headers = new Headers();
      headers.append('X-Auth-Token', this.applicationToken.token);

      return Observable.of(headers);
    } else {
      return this.hat.getApplicationToken('MarketSquare', 'https://marketsquare.hubofallthings.com')
        .map(accessToken => {
          let payload = this.jwt.decodeToken(accessToken);
          this.applicationToken = {
            token: accessToken,
            expires: payload['exp']
          };

          let headers = new Headers();
          headers.append('X-Auth-Token', accessToken);

          return headers;
        });
    }
  }

  tickle(): void {
    const hatDomain = this.hat.hatDomain;
    const url = "https://notables.hubofallthings.com/api/bulletin/tickle";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let query = new URLSearchParams();
    query.append('phata', hatDomain);

    this.http.get(url, { headers: headers, search: query, body: '' })
      .subscribe((res: Response) => {
        if (res.status === 200) {
          console.log("Notables service tickled.");
        } else {
          console.log("Failed to tickle notables service.");
        }
      });
  }

  /*
   * Registers Rumpel as an active data plug with MarketSquare
   */

  connectHAT() {
    const hatDomain = this.hat.hatDomain;
    const url = this.config.market.url + '/dataplugs/' + this.config.market.id + '/connect';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Auth-Token', this.config.market.accessToken);

    let query = new URLSearchParams();
    query.append('hat', hatDomain);

    this.http.get(url, { headers: headers, search: query, body: '' })
      .map(res => res.json())
      .subscribe(
        registrationMessage => {
          console.log('Successfully registered with MarketSquare.', registrationMessage.message);
        },
        error => {
          console.log(`Failed to register with MarketSquare.
                       Reason: ${error}`);
      });
  }

  private handleError(error: Response) {
    const body = error.json() || "";
    const err = body.error || JSON.stringify(body);
    const errMsg = `${error.status} - ${error.statusText || ""}
                    ${err}`;

    console.warn(errMsg);
    return Observable.throw(errMsg);
  }
}
