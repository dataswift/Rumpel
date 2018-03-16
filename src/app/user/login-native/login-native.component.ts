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

@Component({
  selector: 'rum-login-native',
  templateUrl: 'login-native.component.html',
  styleUrls: ['login-native.component.scss']
})
export class LoginNativeComponent implements OnInit {
  public hatDomain: string;
  public error: string;
  private redirectPath: string;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private route: ActivatedRoute,
              private router: Router,
              private storageSvc: BrowserStorageService,
              private authSvc: AuthService) {
  }

  ngOnInit() {
    const qps = this.route.snapshot.queryParams;
    this.redirectPath = qps['target'] || 'feed';

    // Skip login step if the user is already authenticated
    this.authSvc.auth$.subscribe(authenticated => {
      if (authenticated) {
        this.navigateForward()
      }
    });
  }

  clearError() {
    this.error = '';
  }

  get username(): string {
    const host = window.location.hostname;

    return host.substring(0, host.indexOf('.'));
  }

  get protocol(): string {
    return window.location.protocol;
  }

  get hostname(): string {
    return window.location.hostname;
  }

  onSubmit(form) {
    this.storageSvc.rememberMe = form.value.rememberMe;
    this.authSvc.login(this.username, form.value.password).subscribe(
      (token: string) => {
        this.navigateForward();
      },
      err => {
        console.log('Login failed! Reason: ', err);
        this.error = 'Incorrect password. Please try again.';
      });
  }

  private navigateForward(): void {
    this.router.navigate([this.redirectPath], { queryParamsHandling: 'preserve' });
  }

}
