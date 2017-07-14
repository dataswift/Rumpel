import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Claim, Offer } from './interfaces/Offer.interface';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { HatApiService } from '../services/hat-api.service';
import { JwtHelper } from 'angular2-jwt';

import * as moment from 'moment';

@Injectable()
export class DataOfferService {
  private jwt: JwtHelper;
  private cachedToken: string;
  private _offers$: ReplaySubject<any> = <ReplaySubject<any>>new ReplaySubject(1);

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private hatSvc: HatApiService,
              private http: Http) {

    this.jwt = new JwtHelper();
  }


  get offers$(): Observable<any> {
    return this._offers$.asObservable();
  }


  fetchOfferList(): void {
    const url = this.config.databuyer.url.concat('/api/v1/offers');

    this.http.get(url)
      .map(res => {
        const resJson = res.json();
        console.log(resJson);
        return <Offer[]>resJson;
      }).subscribe(offers => {this._offers$.next(offers)});
  }


  fetchUserAwareOfferList(): Observable<Offer[]> {
    const url = this.config.databuyer.url.concat('/api/v1/offersWithClaims');

    return this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();
        console.log(resJson);
        return <Offer[]>resJson;
      });
  }


  fetchUserAwareOfferListSubscription(): void {
    const url = this.config.databuyer.url.concat('/api/v1/offersWithClaims');

    this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();
        console.log(resJson);
        return <Offer[]>resJson;
      }).subscribe(offers => {this._offers$.next(offers)});
  }


  claim(offerId: string): Observable<Offer[]> {
    return this.claimOfferWithDataBuyer(offerId)
      .flatMap((claim: Claim) => this.hatSvc.updateDataDebit(claim.dataDebitId, 'enable'))
      .flatMap((res: Response) => this.fetchUserAwareOfferList());
  }


  redeemCash(): void {
    const url = this.config.databuyer.url.concat('/api/v1/user/redeem/cash');

    this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();
        console.log(resJson);
        return <any[]>resJson;
      }).subscribe();
  }


  private claimOfferWithDataBuyer(offerId: string): Observable<Claim> {
    const url = this.config.databuyer.url.concat('/api/v1/offer/', offerId, '/claim');

    return this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();
        // console.log(resJson);
        return <Claim>resJson;
      });
  }



  private getDataBuyerToken(): Observable<Headers | null> {
    if (this.cachedToken && this.jwt.decodeToken(this.cachedToken)['exp'] > moment().unix()) {
      const headers = new Headers({ 'X-Auth-Token': this.cachedToken });
      return Observable.of(headers);
    } else {
      return this.hatSvc.getApplicationToken(this.config.databuyer.name, 'https://databuyer.hubofallthings.com/')
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
