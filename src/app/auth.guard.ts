/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs/Rx';
import { UserService } from './services/user.service';
import { User } from './shared/interfaces/index';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private user: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    var subject = new ReplaySubject<boolean>();

    this.user.auth$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated === false) {
        let navigationExtras: NavigationExtras = {
          queryParams: { 'redirect': route.routeConfig.path }
        };

        this.router.navigate(['/users/login'], navigationExtras);
      }

      subject.next(isAuthenticated);
    });

    if (route.queryParams['token']) {
      this.user.login(route.queryParams['token']);
    } else {
      this.user.ensureUserAuthenticated();
    }

    return subject.asObservable().take(1);
  }
}
