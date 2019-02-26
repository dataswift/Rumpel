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
import { HatApiService } from '../../core/services/hat-api.service';
import { DialogService } from "../../core/dialog.service";
import { InfoBoxComponent } from "../../core/info-box/info-box.component";

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
              private authSvc: AuthService,
              private hatApiSvc: HatApiService,
              private dialogSvc: DialogService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.hatAddress = window.location.hostname;
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
        window.location.href = this.route.snapshot.queryParams['fallback'];
      }
    });
  }

  dataDebitRole(): string {
    return this.hatApp.application.permissions.rolesGranted.filter(role => role.role === 'datadebit')[0].detail;
  }

  private setupAppDependencies(parentApp: HatApplication, dependencies: HatApplication[], appRedirect: string): void {
    const app = dependencies.filter(d => d.enabled !== true)[0];
    let url = window.location.href.split('?')[0];
    const { name, redirect } = this.route.snapshot.queryParams;
    url += `?name=${name}%26redirect=${redirect}`;
    const callback = url.replace('#', '%23');

    console.log('Redirect value: ', callback);

    this.authSvc.setupApplication(app.application.id)
      .pipe(flatMap(_ => this.authSvc.appLogin(app.application.id)))
      .subscribe(appAccessToken => {
        window.location.href = `${app.application.setup.url}?token=${appAccessToken}&redirect=${callback}`;
      });
  }


  private legacyLogin(): void {
    this.authSvc.hatLogin(this.route.snapshot.queryParams['name'], this.route.snapshot.queryParams['redirect'])
      .subscribe((url: string) => window.location.href = url);
  }

  handleShowPermissions(): void {
    const apps = [this.hatApp, ...this.dependencyApps];
    const message = apps.reduce((message: string, app: HatApplication) => {
      return message + `
        <h4>${app.application.info.name}</h4>
        <ul>
          ${this.processPermissionRoles(app.application.permissions.rolesGranted).join("")}
        </ul>
      `;
    }, "");

    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, { title: 'HAT Microserver Instructions', message });

  }

  private processPermissionRoles(roles: Array<{ role: string; detail?: string; }>): Array<string> {
    return roles.map(role => {
      switch (role.role) {
        case 'namespaceread':
          return `<li><b>Read</b> data from the ${role.detail} namespace.</li>`;
        case 'namespacewrite':
          return `<li><b>Write</b> data into the ${role.detail} namespace.</li>`;
        case 'applicationmanage':
          return `<li>The app needs to be able to manage ${role.detail} app.</li>`;
        case 'applicationlist':
          return '<li>The app needs to be able to list other available applications.</li>';
        case 'datadebit':
          return `<li>Create data debit ${role.detail}.</li>`;
        case 'owner':
          return '<li>This is a Z class app that enables the HAT owner to view, search, browse and organise their HAT data.</li>';
        default:
          return '<li>Unidentified permission request. Please let us know about this issue.</li>';
      }
    });
  }

}
