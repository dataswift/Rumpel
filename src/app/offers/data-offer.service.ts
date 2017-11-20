import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Claim, Offer } from './offer.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HatApiService } from '../services/hat-api.service';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { JwtHelper } from 'angular2-jwt';

import * as moment from 'moment';

@Injectable()
export class DataOfferService {
  private jwt: JwtHelper;
  private cachedToken: string;
  private _offers$: ReplaySubject<any> = <ReplaySubject<any>>new ReplaySubject(1);

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private hatSvc: HatApiService,
              private hatV2Svc: HatApiV2Service,
              private http: Http) {

    this.jwt = new JwtHelper();
  }

  get offers$(): Observable<any> {
    return this._offers$.asObservable();
  }

  fetchOfferList(): void {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offers`;

    this.http.get(url)
      .map(res => {
        const resJson = res.json();

        return <Offer[]>resJson;
      }).subscribe(offers => {this._offers$.next(offers)});
  }

  fetchUserAwareOfferListSubscription(): void {
    this.fetchUserAwareOfferList().subscribe(offers => {this._offers$.next(offers)});
  }

  claim(offerId: string): Observable<Offer[]> {
    return this.claimOfferWithDataBuyer(offerId)
      .flatMap((claim: Claim) => this.hatSvc.updateDataDebit(claim.dataDebitId, 'enable'))
      .flatMap((res: Response) => this.fetchUserAwareOfferList());
  }

  redeemCash(): void {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/user/redeem/cash`;

    this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();
        console.log(resJson);

        return <any[]>resJson;
      }).subscribe();
  }

  private fetchUserAwareOfferList(): Observable<Offer[]> {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offersWithClaims`;

    return Observable.forkJoin(this.getDataBuyerToken(), this.fetchMerchantFilter())
      .flatMap(([headers, merchants]) => {
        const queryParams = new URLSearchParams();

        for (const merchant of merchants) {
          queryParams.append('merchant', merchant);
        }

        return this.http.get(url, { headers: headers, search: queryParams });
      })
      .map(res => {
        const resJson = res.json();

        return <Offer[]>resJson;
      });
  }

  private fetchMerchantFilter(): Observable<string[]> {
    return this.hatV2Svc.getDataRecords('dex', 'databuyer', 1)
      .map((records: HatRecord<any>[]) => {
        if (records.length > 0 && records[0].data && records[0].data.merchants) {
          return records[0].data.merchants;
        } else {
          // HAT is not configured for merchant filtering
          return [];
        }
      });
  }

  private claimOfferWithDataBuyer(offerId: string): Observable<Claim> {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offer/${offerId}/claim`;

    return this.getDataBuyerToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map(res => {
        const resJson = res.json();

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
