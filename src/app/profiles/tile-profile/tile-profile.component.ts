/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { Profile, ProfileSharingConfig } from '../../shared/interfaces/profile.interface';

@Component({
  selector: 'rump-tile-profile',
  templateUrl: 'tile-profile.component.html',
  styleUrls: ['tile-profile.component.scss']
})
export class TileProfileComponent implements OnInit {
  public values: Profile;
  public shares: ProfileSharingConfig;

  constructor(private profilesSvc: ProfilesService) {}

  ngOnInit() {
    this.profilesSvc.profileData$.subscribe((profile: { values: Profile; share: ProfileSharingConfig; }) => {
      this.values = profile.values;
      this.shares = profile.share;
    });

    this.profilesSvc.getProfileData();
  }

}
