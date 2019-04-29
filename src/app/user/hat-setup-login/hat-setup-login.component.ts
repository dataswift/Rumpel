/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
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
import { HatApiService } from '../../core/services/hat-api.service';
import { MatDialog } from '@angular/material';
import { HatAppHmiComponent } from '../../shared/components/hat-app-hmi/hat-app-hmi.component';
import { WINDOW } from '../../core/services/global.service';
import {HatSetupCacheService} from './hat-setup-cache.service';

@Component({
  selector: 'rum-hat-setup-login',
  templateUrl: './hat-setup-login.html',
  styleUrls: ['./hat-setup-login.scss']
})
export class HatSetupLoginComponent implements OnInit {
  public hatAddress: string;
  public errorMessage: string;
  public hatApp: HatApplication;
  public dependencyApps: HatApplication[];
  private redirect: string;
  private hatExists = false;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              @Inject(WINDOW) private windowRef: Window,
              private authSvc: AuthService,
              private hatApiSvc: HatApiService,
              private hatCacheSvc: HatSetupCacheService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.hatAddress = this.windowRef.location.hostname;
    const { name, redirect, dependencies, repeated_signup } = this.route.snapshot.queryParams;

    if (name && redirect) {
      const safeName = name.toLowerCase();

      if (repeated_signup && repeated_signup === 'true') {
        this.hatExists = true;
      }

      if (dependencies) {
        const dependencyAppsArray = dependencies.split(',');

        if (dependencyAppsArray.length > 0) {
          this.hatCacheSvc.getApplicationById(dependencyAppsArray[0]).subscribe( app =>
            this.setupAppDependencies([app])
        );
        }
      } else {
        this.authSvc.getApplicationsByIds(safeName)
          .subscribe(([parentApp, dependencyApps]: [HatApplication, HatApplication[]]) => {
              const dependenciesAreSetup = dependencyApps.every(app => app.enabled);
              const parentAppIsReady = parentApp.enabled && !parentApp.needsUpdating;

              if (parentAppIsReady && dependenciesAreSetup) {
                this.buildRedirect(parentApp);
                this.hatCacheSvc.clearCache();
              } else if (parentAppIsReady) {
                console.log('parent app: ' + parentApp);
                console.log('dependency apps: ' + dependencyApps);

                this.setupAppDependencies(dependencyApps);
              } else {
                this.hatApp = parentApp;
                this.dependencyApps = dependencyApps;
                this.redirect = redirect;
              }
            },
            error => {
              this.windowRef.location.href = this.callBackUrlWithError('access_denied', error.message);
            });
      }
    } else {
      if (!name) {
        this.windowRef.location.href = this.callBackUrlWithError('access_denied', 'application_id_undefined');
      }

      if (!redirect) {
        console.warn('Redirect callback url is not defined.');
        this.errorMessage = 'ERROR: App details incorrect. Please contact the app developer and let them know.';
      }

    }
  }

  get username(): string {
    const host = this.windowRef.location.hostname;

    return host.substring(0, host.indexOf('.'));
  }

  clearError() {
    this.errorMessage = null;
  }

  buildRedirect(app: HatApplication): void {
    // Use internal login option when forcing HAT-native version through terms approval process
    const internal = this.route.snapshot.queryParams['internal'] === 'true';
    const redirect = this.route.snapshot.queryParams['redirect'];

    if (internal) {
      this.router.navigate([redirect]);
    } else {
      this.authSvc.appLogin(app.application.id).subscribe((accessToken: string) => {

        if (!this.authSvc.isRedirectUrlValid(redirect, app)) {
          console.warn('Provided URL is not registered');
          this.hatApiSvc.sendReport('hmi_invalid_redirect_url', `${app.application.id}: ${redirect}`).subscribe(() => {
            this.windowRef.location.href = `${redirect}${redirect.includes('?') ? '&' : '?'}token=${accessToken}`;
          });
        } else {
          this.windowRef.location.href = `${redirect}${redirect.includes('?') ? '&' : '?'}token=${accessToken}`;
        }
      });
    }
  }

  agreeTerms(appId: string): void {
    this.authSvc.setupApplication(appId)
      .subscribe((hatApp: HatApplication) => {
        this.hatCacheSvc.storeApplicationData([hatApp]);
        if (this.dependencyApps.every(app => app.enabled === true)) {
          this.buildRedirect(hatApp);
        } else {
          this.setupAppDependencies(this.dependencyApps); // TODO remove comments
        }
      });
  }

  declineTerms(): void {
    this.hatApiSvc.sendReport('hmi_declined').subscribe(() => {
      const internal = this.route.snapshot.queryParams['internal'] === 'true';
      this.hatCacheSvc.clearCache();
      if (internal) {
        this.router.navigate([this.route.snapshot.queryParams['fallback']]);
      } else {
        this.windowRef.location.href = this.callBackUrlWithError('access_denied', 'user_cancelled');
      }
    });
  }

  dataDebitRole(): string {
    return this.hatApp.application.permissions.rolesGranted.filter(role => role.role === 'datadebit')[0].detail;
  }

  private setupAppDependencies(dependencies: HatApplication[]): void {
    const app = dependencies.filter(d => d.enabled === false)[0];
    const callback = this.intermediateCallBackUrl(app.application.id);

    this.authSvc.setupApplication(app.application.id)
      .pipe(flatMap(_ => this.authSvc.appLogin(app.application.id)))
      .subscribe(appAccessToken => {
        this.windowRef.location.href = `${app.application.setup.url}?token=${appAccessToken}&redirect=${callback}`;
      });
  }

  private intermediateCallBackUrl(appId?: string): string {
    let url = this.windowRef.location.href.split('?')[0];
    const { name, dependencies, redirect } = this.route.snapshot.queryParams;

    url += `?name=${name}%26redirect=${redirect}`;

    if (dependencies) {
      // removes the application id from the dependency parameter
      const dependencyArray = dependencies.split(',').filter( item => item !== appId);
      if (dependencyArray && dependencyArray.length > 0) {
        url += `%26dependencies=${dependencyArray.join()}`;
      }
    } else {
      if (this.dependencyApps) {
        const dependencyArray = this.dependencyApps.filter( app => app.application.id !== appId).map( app => app.application.id);
        if (dependencyArray && dependencyArray.length > 0) {
          url += `%26dependencies=${dependencyArray.join()}`;
        }
      }
    }

    return url.replace('#', '%23');
  }

  private callBackUrlWithError(error: string, errorReason: string): string {
    const { redirect } = this.route.snapshot.queryParams;
    const url = `${redirect}?error=${error}%26error_reason=${errorReason}`;

    return url.replace('#', '%23');
  }

  private legacyLogin(): void {
    this.authSvc.hatLogin(this.route.snapshot.queryParams['name'], this.route.snapshot.queryParams['redirect'])
      .subscribe((url: string) => this.windowRef.location.href = url);
  }

  handleShowPermissions(): void {
    const dialogRef = this.dialog.open(HatAppHmiComponent, {
      data: { title: 'HAT Microserver Instructions', apps: [this.hatApp, ...this.dependencyApps] }
    });
  }

}
