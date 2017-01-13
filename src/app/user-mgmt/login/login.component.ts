/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'rump-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public hatDomain: string;
  private redirectUrl: string = 'https://rumpel.hubofallthings.com/users/authenticate';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    // if (this.route.snapshot.queryParams['redirect']) {
    //   this.redirectUrl += this.route.snapshot.queryParams['redirect'];
    // } else {
    //   this.redirectUrl += 'dashboard';
    // }
  }

  showScreenshot() {
    this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Example of a populated Rumpel')
      .body(`<img src="assets/images/rumpel.png" class="img img-responsive">`)
      .open();
  }

  onSubmit() {
    window.location.href = `https://${this.hatDomain}/hatlogin?name=Rumpel&redirect=${this.redirectUrl}`;
  }

}
