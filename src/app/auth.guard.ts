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
import { APP_CONFIG, IAppConfig } from './app.config';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private router: Router,
              private userSvc: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.queryParams['token']) {
      return this.userSvc.loginWithToken(route.queryParams['token']);
    } else if (this.userSvc.isLoggedIn()) {
      return true;
    } else {
      const navExtras: NavigationExtras = {
        queryParams: { target: route.routeConfig.path }
      };

      if (route.queryParams['name'] && route.queryParams['redirect']) {
        navExtras.queryParams['name'] = route.queryParams['name'];
        navExtras.queryParams['redirect'] = route.queryParams['redirect'];
      }

      const redirectPath = this.config.native ? ['user', 'login'] : ['user', 'login', 'start'];

      this.router.navigate(redirectPath, navExtras);
      return false;
    }

  }
}
