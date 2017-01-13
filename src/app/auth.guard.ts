/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationExtras } from '@angular/router';
import { AuthService } from './services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) {
  }

  canActivate() {
    if (this.authSvc.isAuthenticated()) {
      return true;
    } else if (this.authSvc.isPreviousTokenValid()) {
      const token = this.authSvc.getSavedToken();

      const navigationExtras: NavigationExtras = {
        queryParams: { 'token': token }
      };

      this.router.navigate(['/users/authenticate'], navigationExtras);
      return false;
    } else {
      this.router.navigate(['/users/login']);
      return false;
    }

  }
}
