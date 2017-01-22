/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import {CookieService} from "angular2-cookie/core";
import {DialogService} from "../../layout/dialog.service";
import {InfoBoxComponent} from "../../layout/info-box/info-box.component";

@Component({
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;
  private redirectUrl: string = 'https://rumpel.hubofallthings.com/users/authenticate';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private cookieSvc: CookieService,
              private dialogSvc: DialogService) {
  }

  ngOnInit() {
    this.hatDomain = this.cookieSvc.get("lastLoginPHATA");
    // if (this.route.snapshot.queryParams['redirect']) {
    //   this.redirectUrl += this.route.snapshot.queryParams['redirect'];
    // } else {
    //   this.redirectUrl += 'dashboard';
    // }
  }

  showScreenshot() {
    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      message: "Here should come up a picture of the Rumpel interface. Soon.."
    });
  }

  onSubmit() {
    window.location.href = `https://${this.hatDomain}/hatlogin?name=Rumpel&redirect=${this.redirectUrl}`;
  }

}
