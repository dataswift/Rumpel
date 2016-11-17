import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { MarketSquareService } from '../market-square/market-square.service';
import { ExternalNotification } from "../shared/interfaces/index";

@Injectable()
export class NotificationsService {
  private hatdexNotifications: Array<ExternalNotification>;
  private selectedNotification: number;
  private unreadNotifications: number;
  private totalNotifications: number;
  private _stats$: BehaviorSubject<{ unread: number; total: number; }>;
  private _notification$: BehaviorSubject<ExternalNotification>;

  constructor(private _marketSvc: MarketSquareService) {
    this.hatdexNotifications = [];
    this.selectedNotification = 0;
    this.totalNotifications = 0;
    this.unreadNotifications = 0;

    this._notification$ = new BehaviorSubject(null);
    this._stats$ = new BehaviorSubject({ unread: 0, total: 0 });
  }

  get notification$() {
    return this._notification$.asObservable();
  }

  get stats$() {
    return this._stats$.asObservable();
  }

  getAllNotifications() {
    if (this.totalNotifications === 0) {
      this._marketSvc.getNotifications().subscribe((notifications: Array<ExternalNotification>) => {
        this.hatdexNotifications = notifications.sort((a, b) => a.received > b.received ? -1 : 1);
        this.totalNotifications = notifications.length;

        this.unreadNotifications = this.countUnread();

        this.publishStats();
        this.publishNotification();
      });
    }
  }

  nextNotification() {
    this.markAsRead(this.hatdexNotifications[this.selectedNotification]);
    if (this.selectedNotification + 1 === this.totalNotifications) {
      this.selectedNotification = 0;
    } else {
      this.selectedNotification++;
    }
    this.publishNotification();
  }

  previousNotification() {
    this.markAsRead(this.hatdexNotifications[this.selectedNotification]);
    if (this.selectedNotification === 0) {
      this.selectedNotification = this.totalNotifications - 1;
    } else {
      this.selectedNotification--;
    }
    this.publishNotification();
  }

  markAsRead(notification: ExternalNotification) {
    if (!notification.read) {
      this._marketSvc.markAsRead(notification.notice.id).subscribe((readNotification: ExternalNotification) => {
        let foundNotificationIndex = this.hatdexNotifications.findIndex(note => note.notice.id === readNotification.notice.id);
        this.hatdexNotifications[foundNotificationIndex] = readNotification;

        this.unreadNotifications = this.countUnread();

        this.publishStats();
      });
    }
  }

  private countUnread(): number {
    let unreadCount = 0;
    for (let notification of this.hatdexNotifications) {
      if (!notification.read) {
        unreadCount++;
      }
    }

    return unreadCount;
  }

  private publishNotification() {
    this._notification$.next(this.hatdexNotifications[this.selectedNotification]);
  }

  private publishStats() {
    this._stats$.next({ unread: this.unreadNotifications, total: this.totalNotifications });
  }
}
