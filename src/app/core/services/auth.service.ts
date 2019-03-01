import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { HatApiService } from './hat-api.service';
import { ReplaySubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../user/user.interface';
import { HatApplication } from '../../explore/hat-application.interface';

import * as parse from 'date-fns/parse';
import * as isFuture from 'date-fns/is_future';
import * as addDays from 'date-fns/add_days';
import { HttpResponse } from '@angular/common/http';

declare const httpProtocol: string;

interface TokenUser {
  token: string;
  user: User;
}

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private _token$: ReplaySubject<TokenUser> = <ReplaySubject<TokenUser>>new ReplaySubject(1);

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private storageSvc: BrowserStorageService,
              private hatSvc: HatApiService) {

    const previouslySavedToken = this.storageSvc.getAuthToken();

    if (previouslySavedToken && previouslySavedToken !== 'null') {
      this.loginWithToken(previouslySavedToken);
    }
  }

  get token$(): Observable<string> {
    return this._token$.asObservable().pipe(
      tap(({ token, user }) => {
        if (token) {
          this.storageSvc.setAuthToken(token);
          this.storageSvc.setItem('lastLoginId', user.hatId);
          this.storageSvc.setItem('lastLoginDomain', user.domain);
        } else {
          this.storageSvc.removeAuthToken();
        }
      }),
      map(({ token, user }) => token)
    );
  }

  get user$(): Observable<User> {
    return this._token$.asObservable()
      .pipe(map(({ token, user }) => user));
  }

  get auth$(): Observable<boolean> {
    return this._token$.asObservable()
      .pipe(map((tokenUser: TokenUser) => Boolean(tokenUser.token)));
  }

  login(username: string, password: string): Observable<string> {
    return this.hatSvc.login(username, password)
      .pipe(tap(token => this.loginWithToken(token)));
  }

  loginWithToken(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);

    if (this.tokenIsValid(decodedToken)) {
      this._token$.next({ token, user: this.generateUserInfo(decodedToken) });
    } else {
      this._token$.next({ token: null, user: this.generateUserInfo(null) });
    }
  }

  logout(): void {
    this._token$.next({ token: null, user: this.generateUserInfo(null) });
  }

  getApplicationDetails(name: string, redirect: string = '/'): Observable<HatApplication> {
    return this.hatSvc.getApplicationById(name)
      .pipe(map((hatApp: HatApplication) => {
        // const redirectUrlIsValid = redirect === hatApp.application.setup.url ||
        //                            redirect === hatApp.application.setup.iosUrl; // TODO: add support for Android

        const redirectUrlIsValid = true;

        if (redirectUrlIsValid) {
          return hatApp;
        } else {
          throw new Error('Redirect URL does not match registered value');
        }
      }));
  }

  getApplicationsByIds(parentAppId: string, redirect: string, dependencyAppIds?: string[]):
    Observable<(HatApplication | HatApplication[])[]> {
    return this.hatSvc.getApplicationHmi()
      .pipe(map((apps: HatApplication[]) => {
        const parentApp = apps.find(app => app.application.id === parentAppId);

        return [ parentApp, apps.filter(app => dependencyAppIds.indexOf(app.application.id) > -1) ];
      }));
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

  domainRegistered(domain: string): Observable<boolean> {
    return this.hatSvc.getPublicKey(domain).pipe(
      map((res: HttpResponse<any>) => res.status === 200),
      catchError(error => of(false))
    );
  }

  private generateUserInfo(decodedToken: string | null): User {
    if (decodedToken) {
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

  private tokenIsValid(decodedToken: string): boolean {
    const expiryDate = parse(decodedToken['exp'] * 1000);
    const issuedDate = parse(decodedToken['iat'] * 1000);

    const scopeIsValid = decodedToken['application'] === this.config.tokenApp || decodedToken['accessScope'] === 'owner';
    const tokenDomain = decodedToken['iss'].slice(decodedToken['iss'].indexOf('.'));
    const domainIsValid = this.config.supportedDomains.indexOf(tokenDomain) > -1 || /^[\w.]+:9000$/.test(tokenDomain);
    const notExpired = isFuture(expiryDate) && isFuture(addDays(issuedDate, this.config.tokenExpiryTime));

    return scopeIsValid && domainIsValid && notExpired;
  }

}
