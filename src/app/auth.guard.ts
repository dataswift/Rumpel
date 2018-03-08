/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user/user.service';
import { APP_CONFIG, AppConfig } from './app.config';
import { GlobalMessagingService } from './services/global-messaging.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private redirectPath: string[];

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private messagingSvc: GlobalMessagingService,
              private router: Router,
              private userSvc: UserService) {

    this.redirectPath = config.native ? ['user', 'login'] : ['user', 'login', 'start'];
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.queryParams['token']) {
      const tokenValid = this.userSvc.loginWithToken(route.queryParams['token']);
      if (!tokenValid) {
        this.messagingSvc.sendMessage(
          `Authentication with HAT failed. Either your session has expired or this app is incompatible with your HAT.`
        );
        this.router.navigate(this.redirectPath);
      }

      return tokenValid;
    } else if (this.userSvc.isLoggedIn()) {
      return true;
    } else {
      const navExtras: NavigationExtras = {
        queryParams: { target: route.routeConfig.path },
        queryParamsHandling: 'merge'
      };

      this.router.navigate(this.redirectPath, navExtras);

      return false;
    }

  }
}
