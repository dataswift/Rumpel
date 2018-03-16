/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfilesService } from '../../profiles/profiles.service';
import { NotablesService } from '../notables.service';
import { AuthService } from '../../core/services/auth.service';

import { Notable, Profile } from '../../shared/interfaces';
import { User } from '../../user/user.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { ProfileSharingConfig } from '../../shared/interfaces/profile.interface';

@Component({
  selector: 'rum-tile-notables',
  templateUrl: 'tile-notables.component.html',
  styleUrls: ['tile-notables.component.scss']
})
export class TileNotablesComponent implements OnInit {
  public notables$: Observable<HatRecord<Notable>[]>;
  public profile: { photo: { url: string; shared: boolean; }; };
  public iconMap: any;

  constructor(private notablesSvc: NotablesService,
              private profilesSvc: ProfilesService,
              private authSvc: AuthService) {}

  ngOnInit() {
    this.notables$ = this.notablesSvc.data$;
    this.notablesSvc.getInitData(5);

    this.iconMap = {
      note: 'ellipsischat',
      list: 'list',
      blog: 'write'
    };

    this.profile = {
      photo: { url: '', shared: false }
    };

    this.authSvc.user$.subscribe((user: User) => {
      if (user.fullDomain) {
        // this.profilesSvc.getPicture().subscribe(result => {
        //   if (result && result.url) {
        //     this.profile.photo.url = result.url;
        //   }
        // });
      }
    });

    this.profilesSvc.profileData$.subscribe((profile: { values: Profile; share: ProfileSharingConfig; }) => {
      const latestSnapshot = profile;
      if (latestSnapshot.share && latestSnapshot.share.photo.avatar) {
        this.profile.photo.shared = latestSnapshot.share.photo.avatar;
      }
    });
  }
}
