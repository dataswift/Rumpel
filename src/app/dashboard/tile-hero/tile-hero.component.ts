/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io>
 */

import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../../profiles/profiles.service';
import { AuthService } from '../../core/services/auth.service';
import { DialogService } from '../../core/dialog.service';
import { InfoBoxComponent } from '../../core/info-box/info-box.component';

import { User } from '../../user/user.interface';
import { Profile, ProfileSharingConfig } from '../../shared/interfaces/profile.interface';

@Component({
  selector: 'rum-tile-hero',
  templateUrl: 'tile-hero.component.html',
  styleUrls: ['tile-hero.component.scss']
})
export class TileHeroComponent implements OnInit {
  public profile: { photo: { url: string; shared: boolean; }, domainName: string };

  constructor(private profilesSvc: ProfilesService,
              private dialogSvc: DialogService,
              private authSvc: AuthService) {}

  ngOnInit() {
    this.profile = {
      photo: { url: '', shared: false }, domainName: ''
    };

    this.authSvc.user$.subscribe((user: User) => this.profile.domainName = user.fullDomain);

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
