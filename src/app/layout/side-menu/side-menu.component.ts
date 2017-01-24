/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiStateService, NotificationsService, UserService, HatApiService } from '../../services';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogService } from '../dialog.service';
import { MarketSquareService } from '../../market-square/market-square.service';

@Component({
  selector: 'rump-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() clickNotifications = new EventEmitter<string>();
  public selectedItem: string;
  private sub: any;
  public state: any;
  public menu: Array<any>;
  private comingSoonMenu: Array<any>;
  private unreadNotifications: number;
  private totalNotifications: number;

  // hack: uiState service needs to be injected before Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(private uiState: UiStateService,
              private _dialogSvc: DialogService,
              private _notificationsSvc: NotificationsService,
              private userSvc: UserService,
              private hat: HatApiService,
              private marketSvc: MarketSquareService) {}

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this._notificationsSvc.stats$.subscribe(stats => {
      this.unreadNotifications = stats.unread;
      this.totalNotifications = stats.total;
    });

    this.menu = [
      { display: 'Dashboard', icon: 'dashboard', link: 'dashboard', dataType: '', disable: '' },
      { display: 'Notables', icon: 'notebook', link: 'notables', dataType: '', disable: '' },
      { display: 'Profile', icon: 'user', link: 'profile', dataType: 'profile', disable: '' },
      { display: 'Mashups', icon: 'layergroup', link: 'mashups/myday', dataType: '', disable: '' },
      { display: 'Locations', icon: 'tags', link: 'locations', dataType: 'locations', disable: 'no data' },
      { display: 'Calendar', icon: 'calendar', link: 'calendar', dataType: 'events', disable: 'no data' },
      { display: 'Social', icon: 'replyall', link: 'social', dataType: 'posts,tweets', disable: 'no data' },
      { display: 'Photos', icon: 'camera', link: 'photos', dataType: 'photos', disable: 'no data' },
      { display: 'Data Plugs', icon: 'puzzle', link: '', dataType: '', disable: '' }
    ];

    this.comingSoonMenu = [
      { display: 'Weather', icon: 'thermometer', dataType: '', link: '' },
      { display: 'Finance', icon: 'bank', dataType: '', link: '' },
      { display: 'Creations (music)', icon: 'guitar', dataType: '', link: '' },
      { display: 'Creations (art)', icon: 'brush', dataType: '', link: '' }
    ];

    this.sub = this.uiState.getState$().subscribe(state => {
      for (let dt of state.dataTypes) {
        let changeItem = this.menu.find(item => item.dataType.includes(dt));
        if (changeItem) changeItem.disable = '';
      }
    });
  }

  onItemSelect(itemName: string) {
    this.selectedItem = itemName;
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
