/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { BrowserStorageService } from '../../services/browser-storage.service';
import {ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../user.interface';

@Component({
  selector: 'rump-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent implements OnInit {
  public hatDomain: string;
  public errorMessage: string;

  constructor(private userSvc: UserService,
              private storageSvc: BrowserStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    Observable.forkJoin(
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
        this.errorMessage = 'ERROR: Failed to obtain HAT authentication. Please try again.';
      });
  }

  get username(): string {
    const host = window.location.hostname;
    return host.substring(0, host.indexOf('.'));
  }

  onSubmit(form) {
    this.storageSvc.rememberMe = form.value.rememberMe;
    this.userSvc.login(this.username, form.value.password).subscribe(() => console.log('Logged in!'));
  }

}
