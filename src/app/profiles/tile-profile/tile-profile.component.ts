/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../profiles.service';
import { Profile } from '../../shared/interfaces/profile.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';

@Component({
  selector: 'rump-tile-profile',
  templateUrl: 'tile-profile.component.html',
  styleUrls: ['tile-profile.component.scss']
})
export class TileProfileComponent implements OnInit {
  public profile: Profile;

  constructor(private profilesSvc: ProfilesService) {}

  ngOnInit() {
    this.profilesSvc.profileData$.subscribe((profileSnapshots: HatRecord<Profile>[]) => {
      this.profile = profileSnapshots[0].data;
    });

    this.profilesSvc.getInitData(1);
  }

}
