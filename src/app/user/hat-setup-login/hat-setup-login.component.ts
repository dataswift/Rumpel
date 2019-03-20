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
import { uniq } from 'lodash';
import { WINDOW } from '../../core/services/global.service';

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

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              @Inject(WINDOW) private windowRef: Window,
              private authSvc: AuthService,
              private hatApiSvc: HatApiService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.hatAddress = this.windowRef.location.hostname;
    const { name, redirect, dependencies } = this.route.snapshot.queryParams;

    if (name && redirect) {
      const safeName = name.toLowerCase();

      this.authSvc.getApplicationsByIds(safeName, redirect, dependencies )
        .subscribe(([parentApp, dependencyApps]: [HatApplication, HatApplication[]]) => {
          const dependenciesAreSetup = dependencyApps.every(app => app.enabled); // [].every(x => x = n) ==> true
          const parentAppIsReady = parentApp.enabled && !parentApp.needsUpdating;

          if (parentAppIsReady && dependenciesAreSetup) {
            this.buildRedirect(safeName);
          } else if (parentAppIsReady) {
            console.log('parent app: ' + parentApp);
            console.log('dependency apps: ' + dependencyApps);

            this.setupAppDependencies(parentApp, dependencyApps, redirect);
          } else {
            this.hatApp = parentApp;
            this.dependencyApps = dependencyApps;
            this.redirect = redirect;
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
    const host = this.windowRef.location.hostname;

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
        this.windowRef.location.href = `${this.route.snapshot.queryParams['redirect']}?token=${accessToken}`;
      });
    }
  }

  agreeTerms(appId: string): void {
    this.authSvc.setupApplication(appId)
      .subscribe((hatApp: HatApplication) => {
        if (this.dependencyApps.every(app => app.enabled === true)) {
          this.buildRedirect(appId);
        } else {
          this.setupAppDependencies(hatApp, this.dependencyApps, this.redirect);
        }
      });
  }

  declineTerms(): void {
    this.hatApiSvc.sendReport('hmi_declined').subscribe(() => {
      const internal = this.route.snapshot.queryParams['internal'] === 'true';
      if (internal) {
        this.router.navigate([this.route.snapshot.queryParams['fallback']]);
      } else {
        this.windowRef.location.href = this.route.snapshot.queryParams['fallback'];
      }
    });
  }

  dataDebitRole(): string {
    return this.hatApp.application.permissions.rolesGranted.filter(role => role.role === 'datadebit')[0].detail;
  }

  private setupAppDependencies(parentApp: HatApplication, dependencies: HatApplication[], appRedirect: string): void {
    const app = dependencies.filter(d => d.enabled === false)[0];
    const callback = this.intermediateCallBackUrl();

    console.log('Redirect value: ', callback);

    this.authSvc.setupApplication(app.application.id)
      .pipe(flatMap(_ => this.authSvc.appLogin(app.application.id)))
      .subscribe(appAccessToken => {
        this.windowRef.location.href = `${app.application.setup.url}?token=${appAccessToken}&redirect=${callback}`;
      });
  }
  private intermediateCallBackUrl(): string {
    let url = this.windowRef.location.href.split('?')[0];
    const { name, redirect, dependencies } = this.route.snapshot.queryParams;

    url += `?name=${name}%26redirect=${redirect}`;

    if (dependencies) {
      url += `%26dependencies=${dependencies}`;
    }

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
