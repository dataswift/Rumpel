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
import { UserService } from '../../user/user.service';
import { Profile } from '../../shared/interfaces/profile.interface';
import { User } from '../../user/user.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DialogService } from '../../layout/dialog.service';
import { FileUploadComponent } from '../../layout/file-upload/file-upload.component';

declare var $: any;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

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
  floatingLabel = 'auto';
  color: boolean;
  requiredField: boolean;
  hideRequiredMarker: boolean;
  ctrlDisabled = false;
  textareaNgModelValue: string;

  name: string;
  errorMessageExample1: string;
  errorMessageExample2: string;
  errorMessageExample3: string;
  errorMessageExample4: string;
  dividerColorExample1: string;
  dividerColorExample2: string;
  dividerColorExample3: string;
  items: any[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];
  rows = 8;
  public emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  public websiteFormControl = new FormControl('', [Validators.pattern(URL_REGEX)]);
  public blogFormControl = new FormControl('', [Validators.pattern(URL_REGEX)]);
  public facebookFormControl = new FormControl('', [Validators.pattern(URL_REGEX)]);
  public twitterFormControl = new FormControl('', [Validators.pattern(URL_REGEX)]);
  public linkedinFormControl = new FormControl('', [Validators.pattern(URL_REGEX)]);
  public googlePlusFormControl = new FormControl('', [Validators.pattern(URL_REGEX)]);
  public youtubeFormControl = new FormControl('', [Validators.pattern(URL_REGEX)]);

  constructor(private profilesSvc: ProfilesService,
              private dialogSvc: DialogService,
              private userSvc: UserService,
              private router: Router,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.uiMessageHidden = true;
    this.userSvc.user$.subscribe((user: User) => {
      this.hatUrl = `https://${user.hatId}.${user.domain}/#/public/profile`;
    });

    this.profilePhoto = {};
    this.profilesSvc.profileData$.subscribe((profileSnapshots: HatRecord<Profile>[]) => {
      this.profile = profileSnapshots[0].data;
    });
  }

  get hostname(): string {
    return window.location.hostname;
  }

  switchView() {
    this.router.navigate([ 'public', 'profile' ]);
    // window.open("public/profile", "_blank");
  }

  invokeFileUploadDialog(): void {
    this.dialogSvc.createDialog(FileUploadComponent, {});
  }

  submitForm() {
    // event.preventDefault();
    // this.profile.dateCreated = moment().valueOf();
    // const stringifiedProfile = JSON.parse(JSON.stringify(this.profile, (key, value) => {
    //   if (typeof value === 'boolean') {
    //     return value.toString();
    //   }
    //
    //   return value;
    // }));
    // this.profilesSvc.save(stringifiedProfile).subscribe(_ => {
    //   this.uiMessageHidden = false;
    //   setTimeout(() => this.uiMessageHidden = true, 5000);
    // });

    this.snackBar.open('Profile information saved.');
    setTimeout(() => this.snackBar.dismiss(), 1500);
  }

  discardChanges() {
    this.router.navigate(['']);
  }

  setGroupPrivacy(groupName: string, shared: boolean) {
    // A bit of a hack to force Angular change detection
    setTimeout(() => {
      Object.keys(this.profile[groupName]).forEach((fieldName: string) => {
        this.profile[groupName][fieldName].shared = shared;
      });
    });
  }

  togglePrivacy([groupName, fieldName]): void {
    console.log('a: ', groupName, 'b: ', fieldName);
    console.log(this.profile);
    // A bit of a hack to force Angular change detection
    setTimeout(() => this.profile[groupName][fieldName].shared = !this.profile[groupName][fieldName].shared);
  }

  showPopover(event) {
    $('[data-toggle="popover"]').popover();
  }

}
