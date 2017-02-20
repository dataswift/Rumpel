/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import {CookieService} from "angular2-cookie/core";
import {DialogService} from "../../layout/dialog.service";
import {InfoBoxComponent} from "../../layout/info-box/info-box.component";
import {HatApiService} from "../../services/hat-api.service";

@Component({
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;
  private error: string;
  private redirectUrl: string = 'https://rumpel.hubofallthings.com/';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private route: ActivatedRoute,
              private router: Router,
              private cookieSvc: CookieService,
              private hatSvc: HatApiService,
              private dialogSvc: DialogService) {
  }

  ngOnInit() {
    this.hatDomain = this.cookieSvc.get("lastLoginPHATA");
    if (this.route.snapshot.queryParams['redirect']) {
      this.redirectUrl += this.route.snapshot.queryParams['redirect'];
    } else {
      this.redirectUrl += 'dashboard';
    }
  }

  clearError() {
    this.error = '';
  }

  get username(): string {
    const host = window.location.hostname;
    return host.substring(0, host.indexOf("."));
  }

  get protocol(): string {
    return window.location.protocol;
  }

  get hostname(): string {
    return window.location.hostname;
  }

  onSubmit(password) {
    this.hatSvc.login(this.username, password).subscribe(
      accessToken => {
        let navigationExtras: NavigationExtras = {
          queryParams: { "token": accessToken }
        };
        this.router.navigate(["dashboard"], navigationExtras);
      },
      err => {
        console.log("Login failed! Reason: ", err);
        this.error = "Incorrect password. Please try again."
      });
    // window.location.href = `https://${this.hatDomain}/hatlogin?name=Rumpel&redirect=${this.redirectUrl}`;
  }

}
