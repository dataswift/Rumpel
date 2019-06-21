/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HatApplication } from '../../explore/hat-application.interface';

@Component({
  selector: 'rum-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent implements OnInit {
  public hatDomain: string;
  public errorMessage: string;
  public hatApp: HatApplication;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private authSvc: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const name = this.route.snapshot.queryParams['name'];
    const redirect = this.route.snapshot.queryParams['redirect'];

    if (name && redirect) {
      const safeName = name.toLowerCase();

      this.authSvc.getApplicationDetails(safeName, redirect)
        .subscribe(
      (hatApp: HatApplication) => {
        if (hatApp.enabled && !hatApp.needsUpdating) {
          this.buildRedirect(safeName);
        } else {
          this.hatApp = hatApp;
        }

        console.log('redirect', this.route.snapshot.queryParams['redirect']);
      },
      error => {
          // console.warn('Failed to login. Reason: ', error);
          // this.errorMessage = 'ERROR: Failed to obtain permission profile. Is the app registered?';
          this.legacyLogin();
        }
      );
    } else {
      this.errorMessage = 'ERROR: App details incorrect. Please contact the app developer and let them know.';
    }
  }

  get username(): string {
    const host = window.location.hostname;

    return host.substring(0, host.indexOf('.'));
  }

  clearError() {
    this.errorMessage = null;
  }

  buildRedirect(appName: string): void {
    // Use internal login option when forcing HAT-native version through terms approval process
    const internal = this.route.snapshot.queryParams['internal'] === 'true';
    const redirect = this.route.snapshot.queryParams['redirect'];

    if (internal) {
      this.router.navigate([redirect]);
    } else {
      this.authSvc.appLogin(appName).subscribe((accessToken: string) => {
        const finalRedirect = `${redirect}${redirect.includes('?') ? '&' : '?'}token=${accessToken}`;
        window.location.href = finalRedirect.replace(/#/gi, '%23');
      });
    }
  }

  agreeTerms(appId: string): void {
    this.authSvc.setupApplication(appId).subscribe((hatApp: HatApplication) => this.buildRedirect(appId));
  }

  declineTerms(): void {
    const internal = this.route.snapshot.queryParams['internal'] === 'true';

    if (internal) {
      this.router.navigate([this.route.snapshot.queryParams['fallback']]);
    } else {
      window.location.href = this.route.snapshot.queryParams['fallback'];
    }
  }

  private legacyLogin(): void {
    this.authSvc.hatLogin(this.route.snapshot.queryParams['name'], this.route.snapshot.queryParams['redirect'])
      .subscribe((url: string) => window.location.href = url);
  }

}
