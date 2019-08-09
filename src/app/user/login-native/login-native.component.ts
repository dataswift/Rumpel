/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'rum-login-native',
  templateUrl: 'login-native.component.html',
  styleUrls: ['login-native.component.scss']
})
export class LoginNativeComponent implements OnInit {
  public hatName: string;
  public hatDomain: string;
  public rememberMe: boolean;
  public passwordError = false;
  public accountExists = false;

  private redirectPath: string;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private storageSvc: BrowserStorageService,
              private authSvc: AuthService) {
  }

  ngOnInit() {
    this.rememberMe = true;
    const qps = this.route.snapshot.queryParams;
    this.redirectPath = qps['target'] || 'feed';

    if (!!qps['repeated_signup'] && qps['repeated_signup'] === 'true') {
      this.accountExists = true;
    }

    // Skip login step if the user is already authenticated
    this.authSvc.auth$.subscribe(authenticated => {
      if (authenticated) {
        this.navigateForward();
      }
    });

    const host = window.location.hostname;

    this.hatName = host.substring(0, host.indexOf('.'));
    this.hatDomain = host.substring(host.indexOf('.'));
  }

  get protocol(): string {
    return window.location.protocol;
  }

  goBack(): void {
    this.location.back();
  }

  hideErrorMessage(): void {
    this.passwordError = false;
    this.accountExists = false;
  }

  login(hatPass) {
    this.storageSvc.rememberMe = this.rememberMe;
    this.authSvc.login(this.hatName, hatPass.value).subscribe(
      (token: string) => {
        this.navigateForward();
      },
      err => {
        console.log('Login failed! Reason: ', err);
        this.passwordError = true;
      });
  }

  private navigateForward(): void {
    this.router.navigate([this.redirectPath], { queryParamsHandling: 'preserve' });
  }

}
