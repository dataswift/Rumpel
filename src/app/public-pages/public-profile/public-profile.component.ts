/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import {HatApiService} from '../../services/hat-api.service';
import {Notable} from '../../shared/interfaces/notable.class';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.interface';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'rump-public-profile',
  templateUrl: 'public-profile.component.html',
  styleUrls: ['public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  public userAuthenticated = false;
  public shared: boolean;
  public profile: any;
  public notables: Array<Notable>;

  constructor(private hatSvc: HatApiService,
              private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
    this.hatSvc.getPublicData('profile').subscribe((profileResponse: any) => {
      if (profileResponse['public'] === true) {
        this.shared = true;
        this.profile = profileResponse.profile;
        console.log(this.profile);
        this.notables = profileResponse.notables.map((note: any) => new Notable(note, note.id));
      } else {
        this.shared = false;
      }
    });

    this.userSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
    });
  }

  switchView() {
    this.router.navigate(['profile']);
  }

  get hostname(): string {
    return window.location.hostname;
  }

  isLoading(): boolean {
    return typeof this.shared === 'undefined';
  }

}
