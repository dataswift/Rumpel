/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2019
 */

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HatApplication } from '../../explore/hat-application.interface';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'rum-hat-setup-login',
  templateUrl: './hat-setup-login.html',
  styleUrls: ['./hat-setup-login.scss']
})
export class HatSetupLoginComponent implements OnInit {
  public hatDomain: string;
  public errorMessage: string;
  public hatApp: HatApplication;
  private dependencyApps: HatApplication[];
  private redirect: string;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private authSvc: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const { name, redirect } = this.route.snapshot.queryParams;

    if (name && redirect) {
      const safeName = name.toLowerCase();

      this.authSvc.getApplicationsByIds(safeName, redirect, ['facebook'])
        .subscribe(([parentApp, dependencyApps]: [HatApplication, HatApplication[]]) => {
          console.log('Fetched applications: ', parentApp, dependencyApps);
          const dependenciesAreSetup = dependencyApps.every(app => app.enabled); // [].every(x => x = n) ==> true
          const parentAppIsReady = parentApp.enabled && !parentApp.needsUpdating;

          if (parentAppIsReady && dependenciesAreSetup) {
            this.buildRedirect(safeName);
          } else if (parentAppIsReady) {
            this.setupAppDependencies(parentApp, dependencyApps, redirect);
          } else {
            this.hatApp = parentApp;
            this.dependencyApps = dependencyApps;
            this.redirect = redirect;

            console.log('STATS: hmi_loaded')
          }
        },
          error => {
            console.warn('Failed to login. Reason: ', error);
            this.errorMessage = 'ERROR: Cannot find such application. Is the app registered correctly?';
          });
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

    if (internal) {
      this.router.navigate([this.route.snapshot.queryParams['redirect']]);
    } else {
      this.authSvc.appLogin(appName).subscribe((accessToken: string) => {
        window.location.href = `${this.route.snapshot.queryParams['redirect']}?token=${accessToken}`;
      });
    }
  }

  agreeTerms(appId: string): void {
    this.authSvc.setupApplication(appId)
      .subscribe((hatApp: HatApplication) => {
        console.log('STATS: hmi_accepted');
        if (this.dependencyApps.every(app => app.enabled === true)) {
          this.buildRedirect(appId);
        } else {
          this.setupAppDependencies(hatApp, this.dependencyApps, this.redirect);
        }
      });
  }

  declineTerms(): void {
    const internal = this.route.snapshot.queryParams['internal'] === 'true';

    console.log('STATS: hmi_declined');
    if (internal) {
      this.router.navigate([this.route.snapshot.queryParams['fallback']]);
    } else {
      window.location.href = this.route.snapshot.queryParams['fallback'];
    }
  }

  private setupAppDependencies(parentApp: HatApplication, dependencies: HatApplication[], appRedirect: string): void {
    const app = dependencies.filter(d => d.enabled !== true)[0];
    let url = window.location.href.split('?')[0];
    const { name, redirect } = this.route.snapshot.queryParams;
    url += `?name=${name}%26redirect=${redirect}`;
    const callback = url.replace('#', '%23');

    console.log('Redirect value: ', callback);

    console.log('STATS: hmi_data_plug_setup:' + app.application.id);
    this.authSvc.setupApplication(app.application.id)
      .pipe(flatMap(_ => this.authSvc.appLogin(app.application.id)))
      .subscribe(appAccessToken => {
        console.log('STATS: hmi_data_plug_enabled:' + app.application.id);
        window.location.href = `${app.application.setup.url}?token=${appAccessToken}&redirect=${callback}`;
      });
  }


  private legacyLogin(): void {
    this.authSvc.hatLogin(this.route.snapshot.queryParams['name'], this.route.snapshot.queryParams['redirect'])
      .subscribe((url: string) => window.location.href = url);
  }

}
