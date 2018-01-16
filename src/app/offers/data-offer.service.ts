import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Claim, Offer, OffersStorage } from './offer.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { JwtHelper } from 'angular2-jwt';
import { groupBy } from 'lodash';

import * as moment from 'moment';
import { Moment } from 'moment';
import { DataDebit } from '../shared/interfaces/data-debit.interface';

@Injectable()
export class DataOfferService {
  private jwt: JwtHelper;
  private cachedToken: string;
  private expires: Moment = moment().subtract(10, 'seconds');
  private _offers$: ReplaySubject<OffersStorage> = <ReplaySubject<OffersStorage>>new ReplaySubject(1);

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private hatV2Svc: HatApiV2Service,
              private http: Http) {

    this.jwt = new JwtHelper();
  }

  get offers$(): Observable<any> {
    return this._offers$.asObservable();
  }

  fetchOfferList(): void {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offers`;

    if (this.expires.isBefore()) {
      this.http.get(url)
        .subscribe((res: Response) => {
          this.expires = moment().add(60, 'minutes');
          this._offers$.next({ availableOffers: res.json(), acceptedOffers: [] });
        });
    }
  }

  claim(offerId: string): Observable<DataDebit> {
    return this.claimOfferWithDataBuyer(offerId)
      .flatMap((claim: Claim) => this.hatV2Svc.updateDataDebit(claim.dataDebitId, 'enable'))
      .do(_ => this.fetchUserAwareOfferList(true));
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

  fetchUserAwareOfferList(forceReload = false): void {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offersWithClaims`;

    if (forceReload || this.expires.isBefore()) {
      Observable.forkJoin(this.getDataBuyerToken(), this.fetchMerchantFilter())
        .flatMap(([headers, merchants]) => {
          const queryParams = new URLSearchParams();

          for (const merchant of merchants) {
            queryParams.append('merchant', merchant);
          }

          return this.http.get(url, { headers: headers, search: queryParams });
        })
        .subscribe((res: Response) => {
          const groupedOffers = this.groupOffers(res.json());
          this.expires = moment().add(60, 'minutes');
          this._offers$.next(groupedOffers);
        });
    }
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
      return this.hatV2Svc.getApplicationToken(this.config.databuyer.name, this.config.databuyer.url)
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

  private groupOffers(offers: Offer[]): OffersStorage {
    const { available, accepted } = groupBy(offers, offer => {
      return offer.claim === undefined ? 'available' : 'accepted';
    });

    return {
      availableOffers: available || [],
      acceptedOffers: accepted || []
    };
  }

}
