/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 3, 2017
 */

import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from './app.config';

@Injectable()
export class NativeGuard implements CanActivate {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
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
