/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Subscription } from 'rxjs/Subscription';
import {HatApplication, HatApplicationContent} from '../../explore/hat-application.interface';

@Component({
  selector: 'rum-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent implements OnInit, OnDestroy {
  public hatDomain: string;
  public error: string;
  public hatApp: HatApplicationContent;
  private sub: Subscription;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private userSvc: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const name = this.route.snapshot.queryParams['name'];
    const redirect = this.route.snapshot.queryParams['redirect'];

    if (name && redirect) {
      this.sub = this.userSvc.getApplicationDetails(name, redirect)
        .subscribe(
      (hatApp: HatApplication) => {

        if (hatApp.setup) {
          // this.buildRedirect(name);
          this.hatApp = hatApp.application;
        } else {
          this.hatApp = hatApp.application;
        }
      },
      error => {
        console.warn('Failed to login. Reason: ', error);
        this.error = 'ERROR: Failed to obtain HAT authentication. Please try again.';
        }
      );
    } else {
      // TODO: show error message
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get username(): string {
    const host = window.location.hostname;

    return host.substring(0, host.indexOf('.'));
  }

  clearError() {
    this.error = '';
  }

  buildRedirect(appName: string): void {
    this.userSvc.appLogin(appName).subscribe((accessToken: string) => {
      window.location.href = `${this.route.snapshot.queryParams['redirect']}?token=${accessToken}`;
    });
  }

  agreeTerms(appId: string): void {
    this.userSvc.setupApplication(appId).subscribe((hatApp: HatApplication) => this.buildRedirect(appId));
  }

  declineTerms(): void {
    window.location.href = this.route.snapshot.queryParams['fallback'];
  }

  toggleCardExpansion(endpoint): void {
    endpoint.expanded = !endpoint.expanded;
  }

}
