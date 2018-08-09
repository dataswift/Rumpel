import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Claim, Offer, OffersStorage } from './offer.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HatApiService } from '../core/services/hat-api.service';
import { groupBy } from 'lodash';

import * as moment from 'moment';
import { Moment } from 'moment';
import { DataDebit } from '../data-management/data-debit.interface';
import { HttpParams } from '@angular/common/http';
import { HttpBackendClient } from '../core/services/http-backend-client.service';

const OFFER_CACHING_INTERVAL = 5;

@Injectable()
export class DataOfferService {
  private expires: Moment = moment().subtract(10, 'seconds');
  private _offers$: ReplaySubject<OffersStorage> = <ReplaySubject<OffersStorage>>new ReplaySubject(1);
  private proxiedRequest: (a: string, b: string, c: any) => Observable<any>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private hatSvc: HatApiService,
              private http: HttpBackendClient) {

    this.proxiedRequest = this.hatSvc.proxiedRequest('databuyer');
  }

  get offers$(): Observable<OffersStorage> {
    return this._offers$.asObservable();
  }

  get offersSummary$(): Observable<any> {
    return this.offers$.pipe(map((offers: OffersStorage) => {
      const groupedOffers = groupBy(offers.acceptedOffers, (offer: Offer) => {
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
          this._offers$.next({ availableOffers: resBody as Array<Offer>, acceptedOffers: [] });
        });
    }
  }

  claim(offerId: string): Observable<DataDebit> {
    const url = `${this.config.databuyer.pathPrefix}/offer/${offerId}/claim`;

    return this.proxiedRequest('GET', url, undefined).pipe(
      mergeMap((claim: Claim) => this.hatSvc.enableDataDebit(claim.dataDebitId)),
      tap(_ => this.fetchUserAwareOfferList(true))
    );
  }

  redeemCash(): void {
    const url = `${this.config.databuyer.pathPrefix}/user/redeem/cash`;

    this.proxiedRequest('GET', url, null).subscribe(_ => console.log('Requested cash redemption.'));
  }

  fetchUserAwareOfferList(forceReload = false): void {
    const url = `${this.config.databuyer.pathPrefix}/offersWithClaims`;

    if (forceReload || this.expires.isBefore()) {
      this.fetchMerchantFilter()
        .pipe(flatMap((merchants) => {
          let queryParams = new HttpParams();

          for (const merchant of merchants) {
            queryParams = queryParams.set('merchant', merchant);
          }

          return this.proxiedRequest('GET', url, { params: queryParams });
          // return this.http.get<Offer[]>(url, { headers: headers, params: queryParams });
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

  private groupOffers(offers: Offer[]): OffersStorage {
    const { available, accepted } = groupBy(offers, (offer: Offer) => {
      return offer.claim === undefined ? 'available' : 'accepted';
    });

    return {
      availableOffers: available || [],
      acceptedOffers: accepted || []
    };
  }

}
