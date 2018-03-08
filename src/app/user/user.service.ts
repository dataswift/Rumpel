/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { HatApiV2Service } from '../services/hat-api-v2.service';
import { AuthHttp } from '../services/auth-http.service';
import { User } from './user.interface';
import {HatApplication} from '../explore/hat-application.interface';

@Injectable()
export class UserService {
  private _user$: ReplaySubject<User> = <ReplaySubject<User>>new ReplaySubject(1);

  constructor(private hat: HatApiV2Service,
              private authHttp: AuthHttp) {
  }

  isLoggedIn(): boolean {
    const user: User = this.authHttp.hasValidToken;
    this._user$.next(user);

    return user.authenticated;
  }

  loginWithToken(token: string): boolean {
    const user: User = this.hat.loginWithToken(token);
    this._user$.next(user);

    return user.authenticated;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.hat.login(username, password)
      .map((user: User) => {
        this._user$.next(user);

        return user.authenticated;
      });
  }

  getApplicationDetails(name: string, redirect: string): Observable<HatApplication> {
    return this.hat.getApplicationById(name)
      .map((hatApp: HatApplication) => {
        const redirectUrlIsValid = true; // TODO: check

        if (redirectUrlIsValid) {
          return hatApp;
        } else {
          throw new Error('Redirect URL does not match registered value');
        }
      })
  }

  appLogin(name: string): Observable<string> {
    return this.hat.getApplicationTokenNew(name);
  }

  logout(): void {
    this._user$.next({
      hatId: null,
      domain: null,
      fullDomain: null,
      authenticated: false
    });

    this.authHttp.removeToken();
  }

  recoverPassword(email: string): Observable<any> {
    return this.hat.recoverPassword({ email: email });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.hat.changePassword({ password: oldPassword, newPassword: newPassword });
  }

  resetPassword(resetToken: string, newPassword: string): Observable<any> {
    return this.hat.resetPassword(resetToken, { newPassword: newPassword });
  }

  // getAccountStatus(): Observable<AccountStatus> {
  //   return this.hatSvc.getAccountStatus()
  //     .map((accStatus: Array<any>) => {
  //       return {
  //         previousLogin: accStatus[0]['kind']['metric'],
  //         databaseStorage: {
  //           metric: accStatus[2]['kind']['metric'],
  //           units: accStatus[2]['kind']['units']
  //         },
  //         databaseStorageUsed: {
  //           metric: accStatus[4]['kind']['metric'],
  //           units: accStatus[4]['kind']['units']
  //         },
  //         databaseStorageUsedShare: {
  //           metric: accStatus[6]['kind']['metric'],
  //           units: accStatus[6]['kind']['units']
  //         }
  //       };
  //     });
  // }

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  get auth$(): Observable<boolean> {
    return this.user$
      .map((user: User) => user.authenticated)
      .defaultIfEmpty(false);
  }

  setupApplication(name: string): Observable<HatApplication> {
    return this.hat.setupApplication(name);
  }

}
