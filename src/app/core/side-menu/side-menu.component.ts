/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from '../../services';
import { DataOfferService } from '../../offers/data-offer.service';
import { DataPlugService } from '../../data-management/data-plug.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Router, NavigationEnd } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { User } from '../../user/user.interface';
import { DataPlug } from '../../shared/interfaces/data-plug.interface';
import { OffersStorage } from '../../offers/offer.interface';

@Component({
  selector: 'rum-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<string>();

  public dataplugList: Observable<DataPlug[]>;
  public availableOffersCount = 0;
  private offersSub: Subscription;
  private windowRef: any;

  // hack: uiState service needs to be injected before Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private dataplugSvc: DataPlugService,
              private dataOfferSvc: DataOfferService) {}

  ngOnInit() {
    this.dataplugList = this.dataplugSvc.inactiveDataplugs$;

    this.offersSub = this.dataOfferSvc.offers$
      .subscribe((offers: OffersStorage) => this.availableOffersCount = offers.availableOffers.length);

    this.dataOfferSvc.fetchUserAwareOfferList();
  }

  ngOnDestroy(): void {
    this.offersSub.unsubscribe();
  }

  get menuItems(): Array<any> {
    return this.config.menuItems.private;
  }

  openPlugPopup(plug: any) {
    const loginName = plug.name.charAt(0).toUpperCase() + plug.name.slice(1);

    const w = window.innerWidth;
    const h = window.innerHeight;

    const popupWidth = w * 0.6; const left = w * 0.2;
    const popupHeight = h * 0.7; const top = h * 0.15;

    this.windowRef = window.open(
      '', `Setting up ${plug.name} data plug`,
      `menubar=no,location=yes,resizable=yes,status=yes,chrome=yes,left=${left},top=${top},width=${popupWidth},height=${popupHeight}`);

    this.dataplugSvc.getPlugRedirectUrl(loginName, plug.url)
      .subscribe(redirectUrl => {
        this.windowRef.location = redirectUrl;
      });
  }
}
