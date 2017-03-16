/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userSvc: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.queryParams["token"]) {
      return this.userSvc.loginWithToken(route.queryParams["token"]);
    } else if (this.userSvc.isLoggedIn()) {
      return true;
    } else {
      let navExtras: NavigationExtras = {
        queryParams: { target: route.routeConfig.path }
      };

      if (route.queryParams["name"] && route.queryParams["redirect"]) {
        navExtras.queryParams["name"] = route.queryParams["name"];
        navExtras.queryParams["redirect"] = route.queryParams["redirect"];
      }

      this.router.navigate(["user", "login"], navExtras);
      return false;
    }

  }
}
