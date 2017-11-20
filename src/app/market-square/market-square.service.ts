/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import {Http, Headers, URLSearchParams, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import { APP_CONFIG, AppConfig } from '../app.config';

import * as moment from 'moment';
import {UserService} from '../user/user.service';
import {User} from '../user/user.interface';
import {HatApiService} from '../services/hat-api.service';

@Injectable()
export class MarketSquareService {
  private offersStore: Array<any>;
  private applicationToken: { token: string; expires: number; };
  public hatDomain: string;

  private jwt: JwtHelper;
  private _headers: Headers;
  public notifications: Array<any>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private http: Http,
              private userSvc: UserService,
              private hatSvc: HatApiService) {
    this.offersStore = [];
    this.jwt = new JwtHelper();
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');

    userSvc.user$
      .filter((user: User) => user.authenticated === true)
      .subscribe((user: User) => {
        this.hatDomain = user.fullDomain;
        // this.connectHAT(this.hatDomain);
      });
  }

  getValidOffers(): Observable<any> {
    return this.getAllOffers()
      .map(offers => {
        const validOffers = offers.filter(offer => {
          return moment(offer.expires).isAfter() &&
            (offer.status === 'approved' || offer.status === 'satisfied');
        });

        return validOffers.sort((a, b) => b.offer.rating.up - a.offer.rating.up);
      });
  }

  getAllOffers(forceReload: boolean = false): Observable<any> {
    if (this.offersStore.length > 0 && forceReload === false) {
      return Observable.of(this.offersStore);
    }

    const url = this.config.dex.url + '/offers';

    return this.http.get(url, { headers: this._headers, body: '' })
      .map(res => {
        this.offersStore = res.json();

        return this.offersStore;
      });
  }

  getOfferIdByDataDebitId(dataDebitId: string): Observable<string> {
    const url = this.config.dex.url + '/offer';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => {
        const query = new URLSearchParams();
        query.append('dataDebitId', dataDebitId);

        return this.http.get(url, { headers: headers, search: query, body: '' })
          .map(res => res.json().offer.offerId);
      })
      .catch(err => {
        return Observable.of('Offer not found.');
      });
  }

  getOffer(id: string): Observable<any> {
    const url = this.config.dex.url + '/offer/' + id + '/userClaim';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.get(url, { headers: headers, body: '' })
      .map(res => res.json()))
      .catch(this.handleError);
  }

  claimOffer(id: string) {
    const url = this.config.dex.url + '/offer/' + id + '/claim';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.get(url, { headers: headers, body: '' })
      .map(res => res.json()))
      .catch(err => {
        console.log(`Failed to claim data offer on user's behalf`, err);

        return Observable.of(null);
      });
  }

  getDataPlugs(): Observable<any> {
    const url = this.config.marketsquare.url + '/dataplugs';

    return this.http.get(url, { headers: this._headers, body: '' })
      .map(res => res.json());

  }

  getNotifications(): Observable<any> {
    const url = this.config.dex.url + '/notices';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.get(url, { headers: headers, body: '' }).map(res => res.json()))
      .catch(err => Observable.of({ error: 'Offer not found.' }));
  }

  markAsRead(notificationID: number): Observable<any> {
    const url = this.config.dex.url + '/notices/' + notificationID + '/read';

    return this.getMarketSquareApplicationToken()
      .flatMap(headers => this.http.put(url, {}, { headers: headers }).map(res => res.json()))
      .catch(err => Observable.of({ error: 'Offer could not be marked as read.' }));
  }

  private getMarketSquareApplicationToken(): Observable<Headers> {
    if (this.applicationToken && this.applicationToken.token && this.applicationToken.expires > moment().unix()) {
      const headers = new Headers();
      headers.append('X-Auth-Token', this.applicationToken.token);

      return Observable.of(headers);
    } else {
      return this.hatSvc.getApplicationToken('Dex', 'https://dex.hubofallthings.com')
        .map(accessToken => {
          const payload = this.jwt.decodeToken(accessToken);
          this.applicationToken = {
            token: accessToken,
            expires: payload['exp']
          };

          const headers = new Headers();
          headers.append('X-Auth-Token', accessToken);

          return headers;
        });
    }
  }

  tickle(): void {
    const url = 'https://notables.hubofallthings.com/api/bulletin/tickle';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const query = new URLSearchParams();
    query.append('phata', this.hatDomain);

    this.http.get(url, { headers: headers, search: query, body: '' })
      .subscribe((res: Response) => {
        if (res.status === 200) {
          console.log('Notables service tickled.');
        } else {
          console.log('Failed to tickle notables service.');
        }
      });
  }

  /*
   * Registers Rumpel as an active data plug with MarketSquare
   */

  connectHAT(hatDomain: string): void {
    const url = this.config.dex.url + '/dataplugs/' + this.config.dex.id + '/connect';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Auth-Token', this.config.dex.accessToken);

    const query = new URLSearchParams();
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
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    const errMsg = `${error.status} - ${error.statusText || ''}
                    ${err}`;

    return Observable.throw(errMsg);
  }
}
