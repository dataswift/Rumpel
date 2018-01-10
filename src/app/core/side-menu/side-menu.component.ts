/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services';
import { DataOfferService } from '../../offers/data-offer.service';
import { DataPlugService } from '../../data-management/data-plug.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Router, NavigationEnd } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { User } from '../../user/user.interface';
import { DataPlug } from '../../shared/interfaces/data-plug.interface';

@Component({
  selector: 'rum-side-menu',
  templateUrl: 'side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
  @Output() close = new EventEmitter<string>();

  public selectedItem: string;
  public state: any;
  public userAuthenticated = false;
  public menu: Array<any>;
  public dataplugList: Observable<DataPlug[]>;
  public mobileMode = false;
  public profile: any;
  public isPublicPage = false;
  public availableOffers = 0;
  private offersSub: Subscription;
  public offers: any = [];
  private windowRef: any;

  // hack: uiState service needs to be injected before Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private router: Router,
              private userSvc: UserService,
              private dataplugSvc: DataPlugService,
              private dataOfferSvc: DataOfferService) {}

  ngOnInit() {
    this.selectedItem = window.location.pathname;

    this.dataplugList = this.dataplugSvc.dataplugs$;

    this.state = { dataSources: [], dataTypes: [] };
    this.userAuthenticated = false;
    this.menu = this.config.menuItems.public;

    this.offersSub = this.dataOfferSvc.offers$.subscribe(offers => {
      this.offers = offers.filter(function(offer) {
        let claimStatus = 'untouched';
        if (offer.claim && offer.claim.status) {
          claimStatus = offer.claim.status;
        }

        let moreUsersRequired = false;
        if (offer.requiredMaxUser === 0) {
          moreUsersRequired = true;
        } else {
          moreUsersRequired = (offer.requiredMaxUser - offer.totalUserClaims) > 0;
        }

        return claimStatus === 'untouched' && moreUsersRequired && offer.expires > Date.now();
      });
      this.availableOffers = this.offers.length;
    },
    error => { console.log(error); });

    this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe((event: NavigationEnd) => {
          this.isPublicPage = this.router.isActive('public', false);
        });

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => this.selectedItem = event.url.slice(1));

    this.userSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
      this.menu = user.authenticated ? this.config.menuItems.private : this.config.menuItems.public;

      if (user.authenticated) {
        this.dataOfferSvc.fetchUserAwareOfferListSubscription();
      }
    });
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
