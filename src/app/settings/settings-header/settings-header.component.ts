/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Eleftherios Myteletsis <eleftherios.myteletsis@gmail.com> 3, 2019
 */


import { Component, OnInit } from '@angular/core';
import { HatRecord, Profile, User } from '../../shared/interfaces';
import { ProfilesService } from '../../profiles/profiles.service';
import { AuthService } from '../../core/services/auth.service';
import { SystemStatusService } from '../../services/system-status.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SystemStatusInterface } from '../../shared/interfaces/system-status.interface';

@Component({
  selector: 'rum-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.scss']
})
export class SettingsHeaderComponent implements OnInit {
  public values: Profile;
  public systemStatus$: Observable<SystemStatusInterface[]>;
  public profilePhoto: any;
  public hatUrl: string;
  public hatDomain: string;
  public dataBaseStorage: SystemStatusInterface;
  public dataBaseUsedPercent: SystemStatusInterface;

  constructor(private profilesSvc: ProfilesService,
              private authSvc: AuthService,
              private systemStatusSvc: SystemStatusService
              ) {
  }

  ngOnInit() {
    this.authSvc.user$.subscribe((user: User) => {
      this.hatUrl = `https://${user.hatId}.${user.domain}/#/public/profile`;
      this.hatDomain = user.fullDomain;
    });

    this.profilePhoto = {};

    this.profilesSvc.data$.subscribe((profileArray: HatRecord<Profile>[]) => {
      if (profileArray && profileArray.length > 0) {
        profileArray.forEach(profile => {
          this.values = profile.data;
        })
      }
    });

    this.systemStatus$ = this.systemStatusSvc.systemStatus$.pipe(
      tap((records: SystemStatusInterface[]) => {
        this.dataBaseStorage = records.find(record => record.title === 'Database Storage');
        this.dataBaseUsedPercent = records.find(record => record.title === 'Database Storage Used Share');
      }),
      catchError(err => {
        console.log(err);

        return of([]);
      }))
  };
}
