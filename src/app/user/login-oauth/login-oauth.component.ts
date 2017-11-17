/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../user.interface';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rump-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent implements OnInit, OnDestroy {
  public hatDomain: string;
  public error: string;
  private sub: Subscription;

  constructor(@Inject(APP_CONFIG) public config: IAppConfig,
              private userSvc: UserService,
              private storageSvc: BrowserStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = Observable.zip(
      this.userSvc.user$.filter((user: User) => user.authenticated),
      this.route.queryParams
    )
    .flatMap(([user, queryParams]: [User, Params]) => {
      const name = queryParams['name'] || '';
      const redirect = queryParams['redirect'] || '';

      return this.userSvc.hatLogin(name, redirect);
    })
    .subscribe(
      (redirectUrl: string) => window.location.href = redirectUrl,
      error => {
        console.warn('Failed to login. Reason: ', error);
        this.error = 'ERROR: Failed to obtain HAT authentication. Please try again.';
      });
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

  onSubmit(form) {
    this.storageSvc.rememberMe = form.value.rememberMe;
    this.userSvc.login(this.username, form.value.password).subscribe(
      (isAuthenticated: boolean) => {
        console.log('Authenticated successfully. ', isAuthenticated);
      },
      err => {
        console.log('Login failed! Reason: ', err);
        this.error = 'Incorrect password. Please try again.';
      });
  }

}
