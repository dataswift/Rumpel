/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import { Notable } from '../../shared/interfaces/notable.class';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { HatApiV2Service } from '../../services/hat-api-v2.service';
import { BundleValues } from '../../shared/interfaces/bundle.interface';
import { Profile } from '../../shared/interfaces/profile.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';

@Component({
  selector: 'rum-public-profile',
  templateUrl: 'public-profile.component.html',
  styleUrls: ['public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  public userAuthenticated = false;
  public profile: Profile;
  public notables: HatRecord<Notable>[];

  constructor(private hatSvc: HatApiV2Service,
              private userSvc: UserService) { }

  ngOnInit() {
    this.hatSvc.getPhataPage().subscribe((data: BundleValues) => {
      this.profile = data.profile[0].data;
      this.notables = data.notables;
    });

    this.userSvc.auth$.subscribe((isAuthenticated: boolean) => this.userAuthenticated = isAuthenticated);
  }

  get hostname(): string {
    return window.location.hostname;
  }

}
