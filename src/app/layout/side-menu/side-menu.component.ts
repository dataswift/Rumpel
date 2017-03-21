/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import { UiStateService, UserService } from '../../services';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogService } from '../dialog.service';
import { Subscription } from "rxjs";
import { DataTable } from "../../shared/interfaces/data-table.interface";
import { NotificationsService } from "../notifications.service";
import { Router, NavigationEnd } from "@angular/router";
import { APP_CONFIG, IAppConfig} from "../../app.config";
import { User } from "../../user/user.interface";

@Component({
  selector: 'rump-side-menu',
  templateUrl: 'side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
  @Output() clickNotifications = new EventEmitter<string>();
  public selectedItem: string;
  private sub: Subscription;
  public state: any;
  private userAuthenticated: boolean;
  public menu: Array<any>;
  private comingSoonMenu: Array<any>;
  private unreadNotifications: number;
  private totalNotifications: number;

  // hack: uiState service needs to be injected before Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private uiState: UiStateService,
              private _dialogSvc: DialogService,
              private _notificationsSvc: NotificationsService,
              private router: Router,
              private userSvc: UserService) {}

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };
    this.userAuthenticated = false;
    this.menu = this.config.menuItems.public;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.selectedItem = event.url.slice(1);
      }
    });

    this._notificationsSvc.stats$.subscribe(stats => {
      this.unreadNotifications = stats.unread;
      this.totalNotifications = stats.total;
    });

    this.userSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
      this.menu = user.authenticated ? this.config.menuItems.private : this.config.menuItems.public;
    });

    this.comingSoonMenu = this.config.menuItems.comingSoon;

    this.sub = this.uiState.tables$.subscribe((tables: Array<DataTable>) => {
      for (let table of tables) {
        let itemToActivate = this.menu.find(menuItem => menuItem.dataType.includes(table.name));
        if (itemToActivate) {
          itemToActivate.disable = '';
        }
      }
    });
  }

  showNotificationsCentre() {
    this.clickNotifications.emit(`Show notifications.`);
  }

  displayConfirmDialog() {
    this._dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
      buttons: [{
        title: "Continue",
        link: "https://marketsquare.hubofallthings.com/offers"
      }]
    })
  }
}
