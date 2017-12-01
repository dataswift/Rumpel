/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../../profiles/profiles.service';
import { UserService } from '../../services/index';
import { DialogService } from '../../layout/dialog.service';
import { InfoBoxComponent } from '../../layout/info-box/info-box.component';

import { User } from '../../shared/interfaces/index';
import { Profile, ProfileSharingConfig } from '../../shared/interfaces/profile.interface';

@Component({
  selector: 'rump-tile-hero',
  templateUrl: 'tile-hero.component.html',
  styleUrls: ['tile-hero.component.scss']
})
export class TileHeroComponent implements OnInit {
  public profile: { photo: { url: string; shared: boolean; }, domainName: string };
  public userAuthenticated = false;

  constructor(private profilesSvc: ProfilesService,
              private dialogSvc: DialogService,
              private userSvc: UserService) {}

  ngOnInit() {
    this.profile = {
      photo: { url: '', shared: false }, domainName: ''
    };

    this.userSvc.user$
      .subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
      if (user.authenticated) {
        // this.profilesSvc.getPicture().subscribe(result => {
        //   if (result && result.url) {
        //     this.profile.photo.url = result.url;
        //   }
        // });

        this.profile.domainName = user.fullDomain;
      }
    });

    this.profilesSvc.profileData$.subscribe((latestSnapshot: { values: Profile; share: ProfileSharingConfig; }) => {
      if (latestSnapshot && latestSnapshot.share.photo.avatar) {
        this.profile.photo.shared = latestSnapshot.share.photo.avatar;
      }
    });
  }

  showInfoModal() {
    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      title: 'Who can see this page?',
      message: `This page is only seen by you (and whoever is looking over your shoulder).
               Rumpel is your PERSONAL hyperdata browser for your HAT data.
               You should treat this page like the way you would treat your bank statement page online.`
    });
  }
}
