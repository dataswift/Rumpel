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
import { Profile, ProfileSharingConfig } from '../../shared/interfaces/profile.interface';
import { User } from '../../user/user.interface';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DialogService } from '../../core/dialog.service';
import { FileUploadComponent } from '../../core/file-upload/file-upload.component';

import * as moment from 'moment';
import { FileService } from '../../services/file.service';
import { FileMetadataRes } from '../../shared/interfaces/file.interface';

declare var $: any;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

@Component({
  selector: 'rump-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public values: Profile;
  public share: ProfileSharingConfig;
  public profilePhoto: any;
  public hatUrl: string;
  public hatDomain: string;
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
              private fileSvc: FileService,
              private router: Router,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userSvc.user$.subscribe((user: User) => {
      this.hatUrl = `https://${user.hatId}.${user.domain}/#/public/profile`;
      this.hatDomain = user.fullDomain;
    });

    this.profilePhoto = {};
    this.profilesSvc.profileData$.subscribe((profile: { values: Profile; share: ProfileSharingConfig; }) => {
      this.values = profile.values;
      this.share = profile.share;
    });

    this.profilesSvc.getProfileData();

    this.fileSvc.file$.subscribe((fileMetadata: FileMetadataRes) => {
      setTimeout(() => {
        this.values.photo.avatar = `https://${this.hatDomain}/api/v2/files/content/${fileMetadata.fileId}`;
      });
    });
  }

  invokeFileUploadDialog(): void {
    this.dialogSvc.createDialog(FileUploadComponent, {});
  }

  submitForm() {
    this.values.dateCreated = moment().unix();

    this.profilesSvc.saveProfile(this.values, this.share).subscribe(_ => {
      this.snackBar.open('Profile information saved.');
      setTimeout(() => this.snackBar.dismiss(), 1500);
    });
  }

  setGroupPrivacy(groupName: string, shared: boolean) {
    // A bit of a hack to force Angular change detection
    setTimeout(() => {
      Object.keys(this.share[groupName]).forEach((fieldName: string) => {
        this.share[groupName][fieldName] = shared;
      });
    });
  }

  togglePrivacy([groupName, fieldName]): void {
    // A bit of a hack to force Angular change detection
    setTimeout(() => this.share[groupName][fieldName] = !this.share[groupName][fieldName]);
  }

  showPopover(event) {
    $('[data-toggle="popover"]').popover();
  }

}
