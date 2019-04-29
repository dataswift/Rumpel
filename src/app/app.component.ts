/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app.config';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';

import * as moment from 'moment';
import { GlobalMessagingService } from './services/global-messaging.service';
import { InfoBoxComponent } from './core/info-box/info-box.component';
import { DialogService } from './core/dialog.service';
import { filter } from 'rxjs/operators';
import { WINDOW } from './core/services/global.service';

@Component({
  selector: 'rum-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppRootComponent implements OnInit {
  public showNotifications: boolean;
  public userAuthenticated = false;
  public isPublicPage = false;

  // Had to use auxiliary variable canHide to control notification centre visibility.
  // Outside-click directive produces an error when applied onto dynamically inserted DOM element
  private canHide: boolean;
  private appExpireTime: moment.Moment;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              @Inject(WINDOW) private windowRef: Window,
              private messagingSvc: GlobalMessagingService,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private router: Router) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(_ => {
      const contentContainer = document.querySelector('.mat-sidenav-content');

      if (contentContainer) {
        document.querySelector('.mat-sidenav-content').scroll({ top: 0, left: 0 });
      } else {
        this.windowRef.scroll({ top: 0, left: 0 });
      }

      this.isPublicPage = router.isActive('public', false);
    });
  }

  ngOnInit() {
    console.log(`Rumpel is running. Version: ${this.config.version}`);

    this.showNotifications = false;
    this.canHide = false;

    // After an hour the app is forced to refresh if user defocuses/focuses the tab
    this.appExpireTime = moment().add(1, 'hours');

    this.messagingSvc.message$.subscribe((message: string) => {
      this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, { message: message });
    });

    this.userAuthenticated = false;

    this.authSvc.auth$.subscribe((authenticated: boolean) => {
      this.userAuthenticated = authenticated;
    });


    this.windowRef.onfocus = () => {
      if (moment().isAfter(this.appExpireTime)) {
        this.windowRef.location.reload(true);
      }
    };

    // this._notificationsSvc.showNotifs$.subscribe(status => this.showNotifications = status);
  }
}
