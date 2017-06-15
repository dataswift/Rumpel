/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesService } from '../profiles.service';
import { Profile } from '../../shared/interfaces/profile.interface';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.interface';

declare var $: any;

@Component({
  selector: 'rump-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: Profile;
  public profilePhoto: any;
  public hatUrl: string;
  public uiMessageHidden: boolean;

  constructor(private profilesSvc: ProfilesService,
              private userSvc: UserService,
              private router: Router) {}

  ngOnInit() {
    this.uiMessageHidden = true;
    this.userSvc.user$.subscribe((user: User) => {
      this.hatUrl = `https://${user.hatId}.${user.domain}/#/public/profile`;
    });

    this.profilePhoto = {};
    this.profilesSvc.data$.subscribe((profileSnapshots: Profile[]) => {
      if (profileSnapshots.length > 0) {
        this.profile = profileSnapshots[0];
        console.log(this.profile);
      }
    });

    this.profilesSvc.getPicture().subscribe(
      profilePicture => {
        if (profilePicture) {
          this.profilePhoto = profilePicture;
        }
      },
      err => this.profilePhoto = { url: 'avatar_placeholder.svg'}
    );

    this.profile = {
      private: true,
      fb_profile_photo: { private: true },
      personal: { title: '', first_name: '', middle_name: '',
                  last_name: '', preferred_name: '', private: true },
      nick: { name: '', private: true },
      birth: { date: '', private: true },
      gender: { type: '', private: true },
      age: { group: '', private: true },
      primary_email: { value: '', private: true },
      alternative_email: { value: '', private: true },
      home_phone: { no: '', private: true },
      mobile: { no: '', private: true },
      address_details: { no: '', street: '', postcode: '', private: true },
      address_global: { city: '', county: '', country: '', private: true },
      website: { link: '', private: true },
      blog: { link: '', private: true },
      facebook: { link: '', private: true },
      linkedin: { link: '', private: true },
      twitter: { link: '', private: true },
      google: { link: '', private: true },
      youtube: { link: '', private: true },
      emergency_contact: { first_name: '', last_name: '', mobile: '',
                          relationship: '', private: true },
      about: { title: '', body: '', private: true }
    };

  }

  switchView() {
    this.router.navigate([ 'public', 'profile' ]);
    // window.open("public/profile", "_blank");
  }

  submitForm(event) {
    event.preventDefault();
    this.profilesSvc.postData(this.profile, 'profile');
    // TODO: UI messages should be initialized from the service
    this.uiMessageHidden = false;
    setTimeout(() => this.uiMessageHidden = true, 5000);
  }

  discardChanges() {
    this.router.navigate(['']);
  }

  toggleProfilePrivacy() {
    // A bit of a hack to force Angular change detection
    setTimeout(() => this.profile.private = !this.profile.private);
  }

  togglePrivacy(field: string) {
    // A bit of a hack to force Angular change detection
    setTimeout(() => this.profile[field].private = !this.profile[field].private);
  }

  showPopover(event) {
    $('[data-toggle="popover"]').popover();
  }

}
