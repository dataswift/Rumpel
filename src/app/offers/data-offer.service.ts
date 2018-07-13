import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, forkJoin, of } from 'rxjs';
import { flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Claim, Offer, OffersStorage } from './offer.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HatApiService } from '../core/services/hat-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { groupBy } from 'lodash';

import * as moment from 'moment';
import { Moment } from 'moment';
import { DataDebit } from '../data-management/data-debit.interface';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpBackendClient } from '../core/services/http-backend-client.service';

const OFFER_CACHING_INTERVAL = 5;

@Injectable()
export class DataOfferService {
  private jwt: JwtHelperService;
  private cachedToken: string;
  private expires: Moment = moment().subtract(10, 'seconds');
  private _offers$: ReplaySubject<OffersStorage> = <ReplaySubject<OffersStorage>>new ReplaySubject(1);

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private hatSvc: HatApiService,
              private http: HttpBackendClient) {

    this.jwt = new JwtHelperService();
  }

  get offers$(): Observable<OffersStorage> {
    return this._offers$.asObservable();
  }

  get offersSummary$(): Observable<any> {
    return this.offers$.pipe(map((offers: OffersStorage) => {
      const groupedOffers = groupBy(offers.acceptedOffers, offer => {
        return `${offer.reward.rewardType}-${offer.claim && offer.claim.status}`;
      });

      return {
        vouchersRedeemed: groupedOffers['voucher-redeemed'] && groupedOffers['voucher-redeemed'].length || 0,
        vouchersClaimed: groupedOffers['voucher-completed'] && groupedOffers['voucher-completed'].length || 0,
        vouchersPending: groupedOffers['voucher-claimed'] && groupedOffers['voucher-claimed'].length || 0,
        cashRedeemed: groupedOffers['cash-redeemed'] && groupedOffers['cash-redeemed'].reduce((acc, offer: Offer) => {
          return acc + (<number>offer.reward.value / 100)
        }, 0) || 0,
        cashClaimed: groupedOffers['cash-completed'] && groupedOffers['cash-completed'].reduce((acc, offer: Offer) => {
          return acc + (<number>offer.reward.value / 100)
        }, 0) || 0,
        cashPending: groupedOffers['cash-claimed'] && groupedOffers['cash-claimed'].reduce((acc, offer: Offer) => {
          return acc + (<number>offer.reward.value / 100)
        }, 0) || 0,
        servicesRedeemed: groupedOffers['service-redeemed'] && groupedOffers['service-redeemed'].length || 0,
        servicesClaimed: groupedOffers['service-completed'] && groupedOffers['service-completed'].length || 0,
        servicesPending: groupedOffers['service-claimed'] && groupedOffers['service-claimed'].length || 0,
      }
    }));
  }

  fetchOfferList(): void {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offers`;

    if (this.expires.isBefore()) {
      this.http.get<Offer[]>(url)
        .subscribe(resBody => {
          this.expires = moment().add(OFFER_CACHING_INTERVAL, 'minutes');
          this._offers$.next({ availableOffers: resBody, acceptedOffers: [] });
        });
    }
  }

  claim(offerId: string): Observable<DataDebit> {
    return this.claimOfferWithDataBuyer(offerId).pipe(
      mergeMap((claim: Claim) => this.hatSvc.enableDataDebit(claim.dataDebitId)),
      tap(_ => this.fetchUserAwareOfferList(true))
    );
  }

  redeemCash(): void {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/user/redeem/cash`;

    this.getDataBuyerToken().pipe(
      mergeMap((headers: HttpHeaders) => this.http.get(url, { headers: headers })))
      .subscribe(_ => console.log('Requested cash redemption.'));
  }

  fetchUserAwareOfferList(forceReload = false): void {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offersWithClaims`;

    if (forceReload || this.expires.isBefore()) {
      forkJoin(this.getDataBuyerToken(), this.fetchMerchantFilter())
        .pipe(flatMap(([headers, merchants]) => {
          let queryParams = new HttpParams();

          for (const merchant of merchants) {
            queryParams = queryParams.set('merchant', merchant);
          }

          return this.http.get<Offer[]>(url, { headers: headers, params: queryParams });
        }))
        .subscribe(resBody => {
          const groupedOffers = this.groupOffers(resBody);
          this.expires = moment().add(OFFER_CACHING_INTERVAL, 'minutes');
          this._offers$.next(groupedOffers);
        });
    }
  }

  private fetchMerchantFilter(): Observable<string[]> {
    return this.hatSvc.getDataRecords('dex', 'databuyer', 1)
      .pipe(map((records: HatRecord<any>[]) => {
        if (records.length > 0 && records[0].data && records[0].data.merchants) {
          return records[0].data.merchants;
        } else {
          // HAT is not configured for merchant filtering
          return [];
        }
      }));
  }

  private claimOfferWithDataBuyer(offerId: string): Observable<Claim> {
    const url = `${this.config.databuyer.url + this.config.databuyer.pathPrefix}/offer/${offerId}/claim`;

    return this.getDataBuyerToken().pipe(
      mergeMap((headers: HttpHeaders) => this.http.get<Claim>(url, { headers: headers })));
  }

  private getDataBuyerToken(): Observable<HttpHeaders | null> {
    if (this.cachedToken && this.jwt.decodeToken(this.cachedToken)['exp'] > moment().unix()) {
      const headers = new HttpHeaders({ 'X-Auth-Token': this.cachedToken });

      return of(headers);
    } else {
      return this.hatSvc.getApplicationToken(this.config.databuyer.name, this.config.databuyer.url)
        .pipe(map((accessToken: string) => {
          const payload = this.jwt.decodeToken(accessToken);

          if (payload && payload['exp'] > moment().unix()) {
            this.cachedToken = accessToken;

            return new HttpHeaders({ 'X-Auth-Token': accessToken });
          } else {
            console.error('HAT provided erroneous Application Token', accessToken);

            return null;
          }
        }));
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
