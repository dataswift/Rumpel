/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from './app.config';

import * as moment from 'moment';

@Component({
  selector: 'rump-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppRootComponent implements OnInit {
  public showNotifications: boolean;

  // Had to use auxiliary variable canHide to control notification centre visibility.
  // Outside-click directive produces an error when applied onto dynamically inserted DOM element
  private canHide: boolean;
  private appExpireTime: moment.Moment;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
    console.log(`Rumpel is running. Version: ${this.config.version}`);

    this.showNotifications = false;
    this.canHide = false;

    // After an hour the app is forced to refresh if user defocuses/focuses the tab
    this.appExpireTime = moment().add(1, 'hours');

    window.onfocus = () => {
      if (moment().isAfter(this.appExpireTime)) {
        window.location.reload(true);
      }
    };

  }

  show() {
    this.showNotifications = true;

    setTimeout(() => this.canHide = true, 100);
    setTimeout(() => {
      this.canHide = false;
      this.showNotifications = false;
    }, 10000);
  }

  hide(event) {
    if (this.canHide === true) {
      this.showNotifications = false;
      this.canHide = false;
    }
  }
}
