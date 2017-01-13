/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { AuthService, NotificationsService } from '../../services/index';
import { ExternalNotification } from "../../shared/interfaces/index";

@Component({
  selector: 'rump-notification-centre',
  templateUrl: './notification-centre.component.html',
  styleUrls: ['./notification-centre.component.scss']
})
export class NotificationCentreComponent implements OnInit {
  private notification: ExternalNotification;
  private totalNotifications: number;

  constructor(private _authSvc: AuthService,
              private _notificationsSvc: NotificationsService) { }

  ngOnInit() {
    this.totalNotifications = 0;

    this._notificationsSvc.notification$.subscribe(notification => {
      this.notification = notification;
    });

    this._notificationsSvc.stats$.subscribe(stats => {
      this.totalNotifications = stats.total;
    });

    this._authSvc.auth$.subscribe(authenticated => {
      if (authenticated === true) {
        this._notificationsSvc.getAllNotifications();
      }
    });
  }

  nextNote() {
    this._notificationsSvc.nextNotification();
  }

  previousNote() {
    this._notificationsSvc.previousNotification();
  }

  markAsRead() {
    this._notificationsSvc.markAsRead(this.notification);
  }
}
