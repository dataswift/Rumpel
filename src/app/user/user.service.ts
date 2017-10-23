/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs/Rx';

import { HatApiV2Service } from '../services/hat-api-v2.service';
import { AuthHttp } from '../services/auth-http.service';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private _auth$: Subject<boolean> = <Subject<boolean>>new Subject();
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

  hatLogin(name: string, redirect: string): Observable<any> {
    return this.hat.hatLogin(name, redirect);
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
    return this._auth$.asObservable();
  }

}
