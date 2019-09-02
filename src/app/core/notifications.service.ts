/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExternalNotification } from '../shared/interfaces/index';

@Injectable()
export class NotificationsService {
  private dataswiftNotifications: Array<ExternalNotification>;
  private selectedNotification: number;
  private unreadNotifications: number;
  private totalNotifications: number;
  private _stats$: BehaviorSubject<{ unread: number; total: number; }>;
  private _notification$: BehaviorSubject<ExternalNotification>;
  public showNotifs$: EventEmitter<boolean>;

  public notificationsShowing = false;

  constructor() {
    this.dataswiftNotifications = [];
    this.selectedNotification = 0;
    this.totalNotifications = 0;
    this.unreadNotifications = 0;

    this._notification$ = new BehaviorSubject(null);
    this._stats$ = new BehaviorSubject({ unread: 0, total: 0 });

    this.showNotifs$ = new EventEmitter();
  }

  get notification$() {
    return this._notification$.asObservable();
  }

  get stats$() {
    return this._stats$.asObservable();
  }

  // getAllNotifications() {
  //   if (this.totalNotifications === 0) {
  //     this._marketSvc.getNotifications().subscribe((notifications: Array<ExternalNotification>) => {
  //
  //
  //       if (Array.isArray(notifications)) {
  //         this.dataswiftNotifications = notifications.sort((a, b) => a.received > b.received ? -1 : 1);
  //         this.totalNotifications = notifications.length;
  //       }
  //
  //       this.unreadNotifications = this.countUnread();
  //
  //       this.publishStats();
  //       this.publishNotification();
  //     });
  //   }
  // }

  nextNotification() {
    // this.markAsRead(this.dataswiftNotifications[this.selectedNotification]);
    if (this.selectedNotification + 1 === this.totalNotifications) {
      this.selectedNotification = 0;
    } else {
      this.selectedNotification++;
    }
    this.publishNotification();
  }

  previousNotification() {
    // this.markAsRead(this.dataswiftNotifications[this.selectedNotification]);
    if (this.selectedNotification === 0) {
      this.selectedNotification = this.totalNotifications - 1;
    } else {
      this.selectedNotification--;
    }
    this.publishNotification();
  }

  // markAsRead(notification: ExternalNotification) {
  //   if (!notification.read) {
  //     this._marketSvc.markAsRead(notification.notice.id).subscribe((readNotification: ExternalNotification) => {
  //       const foundNotificationIndex = this.dataswiftNotifications.findIndex(note => note.notice.id === readNotification.notice.id);
  //       this.dataswiftNotifications[foundNotificationIndex] = readNotification;
  //
  //       this.unreadNotifications = this.countUnread();
  //
  //       this.publishStats();
  //     });
  //   }
  // }

  toggleShow(): void {
     this.notificationsShowing = !this.notificationsShowing;
     this.showNotifs$.emit(this.notificationsShowing);
    }

  private countUnread(): number {
    let unreadCount = 0;
    for (const notification of this.dataswiftNotifications) {
      if (!notification.read) {
        unreadCount++;
      }
    }

    return unreadCount;
  }

  private publishNotification() {
    this._notification$.next(this.dataswiftNotifications[this.selectedNotification]);
  }

  private publishStats() {
    this._stats$.next({ unread: this.unreadNotifications, total: this.totalNotifications });
  }
}
