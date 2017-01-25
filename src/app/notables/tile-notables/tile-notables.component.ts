/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { Notable, Profile } from '../../shared/interfaces';
import { ProfilesService } from '../../profiles/profiles.service';
import { NotablesService } from '../notables.service';
import {UserService} from "../../services/user.service";
import {User} from "../../shared/interfaces/user.interface";

@Component({
  selector: 'rump-tile-notables',
  templateUrl: 'tile-notables.component.html',
  styleUrls: ['tile-notables.component.scss']
})
export class TileNotablesComponent implements OnInit {
  public notables: Array<Notable>;
  private profile: { photo: { url: string; shared: boolean; }; };
  public iconMap: any;
  private sub: any;

  constructor(private notablesSvc: NotablesService,
              private profilesSvc: ProfilesService,
              private userSvc: UserService) {}

  ngOnInit() {
    this.notables =[];

    this.iconMap = {
      note: 'ellipsischat',
      list: 'list',
      blog: 'write'
    };

    this.notablesSvc.data$.subscribe(notables => {
      this.notables = notables;
    });

    this.profile = {
      photo: { url: "", shared: false }
    };

    this.userSvc.user$.subscribe((user: User) => {
      if (user.authenticated === true) {
        this.profilesSvc.getPicture().subscribe(result => {
          if (result && result.url) {
            this.profile.photo.url = result.url;
          }
        });
      }
    });

    this.profilesSvc.data$.subscribe((profileSnapshots: Profile[]) => {
      let latestSnapshot = profileSnapshots[0];
      if (latestSnapshot && latestSnapshot.fb_profile_photo) {
        this.profile.photo.shared = !latestSnapshot.fb_profile_photo.private;
      }
    });

    this.profilesSvc.getRecentData();
    this.notablesSvc.getRecentData();
  }

}
