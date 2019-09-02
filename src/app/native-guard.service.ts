/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 4, 2017
 */

import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from './app.config';

@Injectable()
export class NativeGuard implements CanActivate {

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private router: Router) {}

  canActivate(): boolean {
    if (this.config.native) {
      return true;
    } else {
      this.router.navigate(['user', 'login', 'start']);

      return false;
    }
  }

}
