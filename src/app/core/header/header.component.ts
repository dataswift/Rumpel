/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../dialog.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { UserService } from '../../services/index';
import { User } from '../../shared/interfaces/index';
import { Subscription } from 'rxjs/Subscription';
import { AccountStatus } from '../../user/account-status.interface';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Profile, ProfileSharingConfig } from '../../shared/interfaces/profile.interface';
import { MatMenuTrigger } from '@angular/material';

declare var $: any;

@Component({
  selector: 'rump-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) accountMenuBtn: MatMenuTrigger;
  @Output() clickNotifications = new EventEmitter<string>();
  public hatDomain: string;
  private sub: Subscription;
  public marketSquareLink: string;
  public userAuthenticated = false;
  public profile: { photo: { url: string; shared: boolean; }, first_name: string, hatId: string, domain: string };
  public accountStatus: AccountStatus;
  public showNotifications: boolean;

  public unreadNotifications: number;
  public totalNotifications: number;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private router: Router,
              private dialogSvc: DialogService,
              private userSvc: UserService,
              private profilesSvc: ProfilesService) { }

  ngOnInit() {
    this.marketSquareLink = 'https://marketsquare.hubofallthings.com';
    this.profile = { photo: { url: '', shared: false }, first_name: '', hatId: '', domain: '' };
    this.userAuthenticated = false;
    this.showNotifications = false;

    this.sub = this.userSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
      if (user.authenticated) {
        this.hatDomain = user.fullDomain;
        this.profile.domain = user.domain;
        this.profile.hatId = user.hatId;
        this.marketSquareLink = `https://${this.hatDomain}/hatlogin?name=MarketSquare&` +
                                `redirect=https://marketsquare.hubofallthings.com/authenticate/hat`;
      } else {
        this.hatDomain = null;
        this.marketSquareLink = 'https://marketsquare.hubofallthings.com/';
      }
    });


    this.totalNotifications = 0;

    this.profilesSvc.profileData$.subscribe((profile: { values: Profile; share: ProfileSharingConfig; }) => {
      if (profile.values && profile.values.personal.firstName) {
        this.profile.first_name = profile.values.personal.firstName;
      }

      if (profile.share && profile.share.photo.avatar) {
        this.profile.photo.shared = profile.share.photo.avatar;
      }
    });

  }

  showInfoModal() {
    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      title: 'Help',
      icon: 'assets/images/help.svg',
      message: `HATs are distributed systems and being private also means no one will know if you have a problem.<br><br>
      If you have an issue with your HAT or this dashboard, please report it <a href="mailto:contact@HATDeX.org?subject=Support%20for%20`
      + window.location.hostname + `">here</a>`
    });
  }

  signOut() {
    this.userSvc.logout();
    this.router.navigate(['/public/profile']);
  }

  signIn() {
    this.router.navigate(['/user/login']);
  }

  // showNotificationsCentre() {
  //   if (this.totalNotifications > 0) {
  //     this._notificationsSvc.toggleShow();
  //   }
  // }

  navigateTo(link: string) {
    window.location.href = link;
  }

  showPopover() {
    $('[data-toggle="popover"]').popover();
  }

  toggleSideMenu() {
    document.querySelector('.burger').click();
  }

  showAccountOptions() {
    $('.dropdown-toggle').dropdown();
  }

  showNotificationsBar(bool: boolean): void {
    this.showNotifications = bool;

    const duration = 400;
    let barHeight = 64;

    if (bool === false) {
      barHeight = 0;
    }

    $('.navbar, .menubar-left, .burger, .content-main').stop().animate({ marginTop: barHeight }, duration);
    $('.notifications-wrapper').stop().animate({ top: (barHeight - 100) }, duration);
  }

  round(value: number, decimalPlaces: number): number {
    const multiplier = Math.pow(10, decimalPlaces);

    return Math.round(value * multiplier) / multiplier;
  }
}
