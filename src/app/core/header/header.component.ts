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
import { AuthService } from '../../core/services/auth.service';
import { HatRecord, User } from '../../shared/interfaces/index';
import { Observable, of, Subscription } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Profile } from '../../shared/interfaces/profile.interface';
import { MatMenuTrigger } from '@angular/material';
import { SystemStatusInterface } from '../../shared/interfaces/system-status.interface';
import { catchError, tap } from 'rxjs/operators';
import { SystemStatusService } from '../../services/system-status.service';

@Component({
  selector: 'rum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) accountMenuBtn: MatMenuTrigger;
  @ViewChild(MatMenuTrigger, { static: true }) accountMenuBtn!: MatMenuTrigger;

  @Output() clickNotifications = new EventEmitter<string>();
  @Output() menuToggle = new EventEmitter<string>();
  public hatDomain: string;
  private sub: Subscription;
  public userAuthenticated = false;
  public profile: { photo: { url: string; shared: boolean; }, first_name: string, hatId: string, domain: string };
  public systemStatus$: Observable<SystemStatusInterface[]>;
  public dataBaseStorage: SystemStatusInterface;
  public dataBaseUsedPercent: SystemStatusInterface;
  public previousLogin: SystemStatusInterface = {title: '', kind: {metric: '', kind: ''}};
  public showNotifications: boolean;

  public unreadNotifications: number;
  public totalNotifications: number;

  constructor(@Inject(APP_CONFIG) public config: AppConfig,
              private router: Router,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private profilesSvc: ProfilesService,
              private systemStatusSvc: SystemStatusService) { }

  ngOnInit() {
    this.profile = { photo: { url: '', shared: false }, first_name: '', hatId: '', domain: '' };
    this.userAuthenticated = false;
    this.showNotifications = false;

    this.sub = this.authSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = Boolean(user.fullDomain);
      this.hatDomain = user.fullDomain;
      this.profile.domain = user.domain;
      this.profile.hatId = user.hatId;
    });

    this.profilesSvc.getProfileInitData();

    this.totalNotifications = 0;

    this.profilesSvc.data$.subscribe((profileArray: HatRecord<Profile>[]) => {
      if (profileArray && profileArray.length > 0) {
        profileArray.forEach( profile => {
          if (profile.data && profile.data.personal && profile.data.personal.firstName) {
            this.profile.first_name = profile.data.personal.firstName;
          }
          if (profile.data.photo.avatar) {
            this.profile.photo.url = profile.data.photo.avatar
          }
        })
      }
    });

    this.systemStatus$ = this.systemStatusSvc.systemStatus$.pipe(
      tap((records: SystemStatusInterface[]) => {
        this.dataBaseStorage = records.find(record => record.title === 'Database Storage');
        this.dataBaseUsedPercent = records.find(record => record.title === 'Database Storage Used Share');
        this.previousLogin = records.find(record => record.title === 'Previous Login');
      }),
      catchError(err => {
        console.log(err);

        return of([]);
      }))

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
    this.authSvc.logout();
    this.router.navigate(['/public/profile']);
  }

  signIn() {
    this.router.navigate(['/user/login']);
  }

  toggleSideMenu() {
    this.menuToggle.emit('Menu button toggled');
  }

  showNotificationsBar(bool: boolean): void {
    this.showNotifications = bool;

    const duration = 400;
    let barHeight = 64;

    if (bool === false) {
      barHeight = 0;
    }
  }
}
