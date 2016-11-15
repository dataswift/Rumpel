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
