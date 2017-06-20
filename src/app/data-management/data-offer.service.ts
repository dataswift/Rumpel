import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Claim, Offer } from './interfaces/Offer.interface';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { HatApiService } from '../services/hat-api.service';
import { JwtHelper } from 'angular2-jwt';

import * as moment from 'moment';

@Injectable()
export class DataOfferService {
  private jwt: JwtHelper;
  private cachedToken: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private hatSvc: HatApiService,
              private http: Http) {

    this.jwt = new JwtHelper();
  }

  fetchOfferList(): Observable<Offer[]> {
    const url = this.config.databuyer.url.concat('/api/v1/offers');

    return this.http.get(url)
      .map(res => {
        const resJson = res.json();
        console.log(resJson);
        return <Offer[]>resJson;
      })
  }

  fetchUserAwareOfferList(): Observable<Offer[]> {
    const url = this.config.databuyer.url.concat('/api/v1/offers');

    return this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();
        console.log(resJson);
        return <Offer[]>resJson;
      });
  }

  claim(offerId: string): Observable<Offer[]> {
    return this.claimOfferWithDataBuyer(offerId)
      .flatMap((claim: Claim) => this.hatSvc.updateDataDebit(claim.dataDebitId, 'enable'))
      .flatMap((res: Response) => this.fetchUserAwareOfferList());
  }

  private claimOfferWithDataBuyer(offerId: string): Observable<Claim> {
    const url = this.config.databuyer.url.concat('/offer/', offerId, '/userClaim');

    return this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();
        console.log(resJson);
        return <Claim>resJson;
      });
  }

  private getDataBuyerToken(): Observable<Headers | null> {
    if (this.cachedToken && this.jwt.decodeToken(this.cachedToken)['exp'] > moment().unix()) {
      const headers = new Headers({ 'X-Auth-Token': this.cachedToken });
      return Observable.of(headers);
    } else {
      return this.hatSvc.getApplicationToken(this.config.databuyer.name, this.config.databuyer.url)
        .map((accessToken: string) => {
          const payload = this.jwt.decodeToken(accessToken);

          if (payload && payload['exp'] > moment().unix()) {
            this.cachedToken = accessToken;

            return new Headers({ 'X-Auth-Token': accessToken });
          } else {
            console.error('HAT provided erroneous Application Token', accessToken);
            return null;
          }
        });
    }
  }

}
