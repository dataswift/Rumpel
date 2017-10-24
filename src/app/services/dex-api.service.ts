import {Inject, Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {Observable} from 'rxjs/Observable';
import {JwtHelper} from 'angular2-jwt';
import {HatApiV2Service} from './hat-api-v2.service';
import {DexOfferClaimRes} from '../shared/interfaces/dex-offer-claim-res.interface';

@Injectable()
export class DexApiService {
  private baseUrl: string;
  private cachedAppToken: string;
  private jwt: JwtHelper = new JwtHelper();

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private hat: HatApiV2Service,
              private http: Http) {
    this.baseUrl = config.dex.url + config.dex.pathPrefix;
  }

  claimOffer(offerId: string): Observable<DexOfferClaimRes> {
    const url = `${this.baseUrl}/offer/${offerId}/claim`;

    return this.getApplicationToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map((res: Response) => <DexOfferClaimRes>res.json());
  }

  getOfferClaim(offerId: string): Observable<DexOfferClaimRes> {
    const url = `${this.baseUrl}/offer/${offerId}/userClaim`;

    return this.getApplicationToken()
      .flatMap((headers: Headers) => this.http.get(url, { headers: headers }))
      .map((res: Response) => <DexOfferClaimRes>res.json());
  }

  private getApplicationToken(): Observable<Headers> {
    if (this.cachedAppToken && !this.jwt.isTokenExpired(this.cachedAppToken, 30)) {
      const headers = new Headers();
      headers.append('X-Auth-Token', this.cachedAppToken);
      headers.append('Content-Type', 'application/json');

      return Observable.of(headers);
    } else {
      return this.hat.getApplicationToken(this.config.dex.name, this.config.dex.url)
        .do(token => this.cachedAppToken = token)
        .map(token => new Headers({ 'X-Auth-Token': token }));
    }
  }

}
