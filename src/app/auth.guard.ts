/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { APP_CONFIG, AppConfig } from './app.config';
import { GlobalMessagingService } from './services/global-messaging.service';
import { Observable, of } from 'rxjs';
import { tap, timeoutWith } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  private redirectPath: string[];

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private messagingSvc: GlobalMessagingService,
              private router: Router,
              private authSvc: AuthService) {

    this.redirectPath = config.native ? ['user', 'login'] : ['user', 'login', 'start'];
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let tokenLogin = false;
    if (route.queryParams['token']) {
      this.authSvc.loginWithToken(route.queryParams['token']);
      tokenLogin = true;
    }

    return this.authSvc.auth$.pipe(
      timeoutWith(50, of(false)),
      tap((authenticated: boolean) => {
        if (!authenticated && tokenLogin) {
          this.messagingSvc.sendMessage(
            `Authentication with HAT failed. Either your session has expired or this app is incompatible with your HAT.`
          );
        }

        if (!authenticated) {
          const navExtras: NavigationExtras = { queryParams: Object.assign({}, route.queryParams) };
          navExtras.queryParams['target'] = state.url.split('?')[0];

          this.router.navigate(this.redirectPath, navExtras);
        }
      })
    );
  }
}
