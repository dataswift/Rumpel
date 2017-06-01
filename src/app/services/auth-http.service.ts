/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2, 2017
 */

import { Injectable } from '@angular/core';
import { Http, XHRBackend, Request, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { ReplaySubject, Observable } from 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../user/user.interface';
import { BrowserStorageService } from './browser-storage.service';
import { IAppConfig } from '../app.config';

declare var httpProtocol: string;
const COOKIE_EXPIRATION_CHECK_OFFSET = 600; // in seconds

@Injectable()
export class AuthHttp extends Http {
  private tokenName: string;
  private hatBaseUrl: string;
  private jwtHelper: JwtHelper = new JwtHelper();
  private _auth$: ReplaySubject<boolean> = <ReplaySubject<boolean>>new ReplaySubject();

  constructor(backend: XHRBackend, defaultOptions: RequestOptions,
              private storageSvc: BrowserStorageService,
              private config: IAppConfig) {
    super(backend, defaultOptions);

    this.hatBaseUrl = `${httpProtocol || config.protocol}//${window.location.hostname}`;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (this.hasValidToken) {
      return super.request(url, options)
        .catch(err => {
          console.log('Got an error 1', err);
          return Observable.throw(err);
        });
    } else {
      return Observable.throw('JWT does not exist');
    }
  }

  get(path: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.hasValidToken) {
      console.log('Starting request with URL', this.hatBaseUrl + path);

      return super.get(this.hatBaseUrl + path, this.addAuthorizationHeaders(options))
        .catch(err => {
          console.log('Got an error 2', err);
          return Observable.throw(err);
        });
    } else {
      return Observable.throw('JWT does not exist!');
    }
  }

  post(path: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    if (this.hasValidToken) {
      console.log('Starting request with URL', this.hatBaseUrl + path);

      return super.post(this.hatBaseUrl + path, body, this.addAuthorizationHeaders(options))
        .catch(err => {
          console.log('Got an error 3', err);
          return Observable.throw(err);
        });
    } else {
      return Observable.throw('JWT does not exist!');
    }
  }

  put(path: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    if (this.hasValidToken) {
      console.log('Starting request with URL', this.hatBaseUrl + path);

      return super.put(this.hatBaseUrl + path, body, this.addAuthorizationHeaders(options))
        .catch(err => {
          console.log('Got an error 4', err);
          return Observable.throw(err);
        });
    } else {
      return Observable.throw('JWT does not exist!');
    }
  }

  delete(path: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.hasValidToken) {
      console.log('Starting request with URL', this.hatBaseUrl + path);

      return super.delete(this.hatBaseUrl + path, this.addAuthorizationHeaders(options))
        .catch(err => {
          console.log('Got an error 5', err);
          return Observable.throw(err);
        });
    } else {
      return Observable.throw('JWT does not exist!');
    }
  }

  removeToken(): void {
    this.tokenName = null;
    this.storageSvc.removeAuthToken();
    this._auth$.next(false);
  }

  /* Sets HAT authentication token if valid, returns result of the validation process */
  // TODO: improve token validation implementation
  setToken(token: string): User {
    if (this.validateToken(token)) {
      this.tokenName = token;
      const fullDomain = this.jwtHelper.decodeToken(token)['iss'];

      this.hatBaseUrl = `${httpProtocol || this.config.protocol}//${fullDomain}`;
      const hatId = fullDomain.slice(0, fullDomain.indexOf('.'));
      const domain = fullDomain.slice(fullDomain.indexOf('.') + 1);
      this.storageSvc.setItem('lastLoginId', hatId);
      this.storageSvc.setItem('lastLoginDomain', domain);
      this.storageSvc.setAuthToken(token);
      this._auth$.next(true);
      return {
        hatId: hatId,
        domain: domain,
        fullDomain: fullDomain,
        authenticated: true
      };
    } else {
      this._auth$.next(false);
      return {
        hatId: null,
        domain: null,
        fullDomain: null,
        authenticated: false
      };
    }
  }

  get hasValidToken(): User {
    if (this.validateToken(this.tokenName)) {
      const fullDomain = this.jwtHelper.decodeToken(this.tokenName)['iss'];

      return {
        hatId: fullDomain.slice(0, fullDomain.indexOf('.')),
        domain: fullDomain.slice(fullDomain.indexOf('.') + 1),
        fullDomain: fullDomain,
        authenticated: true
      };
    } else {
      const token = this.storageSvc.getAuthToken();

      if (this.validateToken(token)) {
        this.tokenName = token;
        const fullDomain = this.jwtHelper.decodeToken(token)['iss'];
        this.hatBaseUrl = `${httpProtocol || this.config.protocol}//${fullDomain}`;
        this._auth$.next(true);
        return {
          hatId: fullDomain.slice(0, fullDomain.indexOf('.')),
          domain: fullDomain.slice(fullDomain.indexOf('.') + 1),
          fullDomain: fullDomain,
          authenticated: true
        };
      } else {
        return {
          hatId: null,
          domain: null,
          fullDomain: null,
          authenticated: false
        };
      }
    }
  }

  get auth$(): Observable<boolean> {
    return this._auth$.asObservable();
  }

  private validateToken(token: string): boolean {
    if (token) {
      return !this.jwtHelper.isTokenExpired(token, COOKIE_EXPIRATION_CHECK_OFFSET);
    } else {
      return false;
    }
  }

  private addAuthorizationHeaders(options: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = { headers: new Headers() };
    } else if (!options.headers) {
      options.headers = new Headers();
    }

    options.headers.set('X-Auth-Token', this.tokenName);
    return options;
  }

}
