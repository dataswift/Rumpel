import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { HatApiService } from './hat-api.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable'
import { User } from '../../user/user.interface';
import { HatApplication } from '../../explore/hat-application.interface';

import * as parse from 'date-fns/parse';
import * as isFuture from 'date-fns/is_future';
import * as addDays from 'date-fns/add_days';

declare const httpProtocol: string;

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private _token$: ReplaySubject<string> = <ReplaySubject<string>>new ReplaySubject(1);

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private storageSvc: BrowserStorageService,
              private hatSvc: HatApiService) {

    const previouslySavedToken = this.storageSvc.getAuthToken();

    if (previouslySavedToken) {
      this._token$.next(previouslySavedToken);
    }
  }

  get token$(): Observable<string> {
    return this._token$.asObservable()
      .do(token => this.storageSvc.setAuthToken(token));
  }

  get user$(): Observable<User> {
    return this._token$
      .map(token => this.generateUserInfo(token))
      .do((user: User) => {
        this.storageSvc.setItem('lastLoginId', user.hatId);
        this.storageSvc.setItem('lastLoginDomain', user.domain);
      });
  }

  get auth$(): Observable<boolean> {
    return this.user$
      .map((user: User) => {
        console.log('new user', user);

        return Boolean(user.fullDomain)
    }).defaultIfEmpty(false);
  }

  login(username: string, password: string): Observable<string> {
    return this.hatSvc.login(username, password)
      .do(token => this.loginWithToken(token));
  }

  loginWithToken(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);

    this._token$.next(this.validateToken(decodedToken) ? token : null);
  }

  logout(): void {
    this._token$.next(null);
  }

  getApplicationDetails(name: string, redirect: string): Observable<HatApplication> {
    return this.hatSvc.getApplicationById(name)
      .map((hatApp: HatApplication) => {
        const redirectUrlIsValid = true; // TODO: check

        if (redirectUrlIsValid) {
          return hatApp;
        } else {
          throw new Error('Redirect URL does not match registered value');
        }
      });
  }

  hatLogin(name: string, redirect: string): Observable<string> {
    return this.hatSvc.legacyHatLogin(name, redirect);
  }

  appLogin(name: string): Observable<string> {
    return this.hatSvc.getApplicationTokenNew(name);
  }


  recoverPassword(email: string): Observable<any> {
    return this.hatSvc.recoverPassword({ email: email });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.hatSvc.changePassword({ password: oldPassword, newPassword: newPassword });
  }

  resetPassword(resetToken: string, newPassword: string): Observable<any> {
    return this.hatSvc.resetPassword(resetToken, { newPassword: newPassword });
  }

  setupApplication(name: string): Observable<HatApplication> {
    return this.hatSvc.setupApplication(name);
  }

  private generateUserInfo(token: string): User {
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const fullDomain = decodedToken['iss'];

      return {
        hatId: fullDomain.slice(0, fullDomain.indexOf('.')),
        domain: fullDomain.slice(fullDomain.indexOf('.') + 1),
        fullDomain: fullDomain,
        hatUrl: `${httpProtocol || this.config.protocol}//${fullDomain}`
      }
    } else {
      return {
        hatId: null,
        domain: null,
        fullDomain: null,
        hatUrl: null
      }
    }
  }

  private validateToken(decodedToken: string): boolean {
    const expiryDate = parse(decodedToken['exp'] * 1000);
    const issuedDate = parse(decodedToken['iat'] * 1000);

    const scopeIsValid = decodedToken['application'] === this.config.tokenApp || decodedToken['accessScope'] === 'owner';
    const domainIsValid = this.config.supportedDomains.includes(decodedToken['iss'].slice(decodedToken['iss'].indexOf('.')));
    const notExpired = isFuture(expiryDate) && isFuture(addDays(issuedDate, this.config.tokenExpiryTime));

    return scopeIsValid && domainIsValid && notExpired;
  }

}
