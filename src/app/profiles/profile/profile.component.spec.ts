/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { PrivacyToggleHelperComponent } from '../privacy-toggle-helper/privacy-toggle-helper.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { PresignImgUrlPipe } from '../../shared/pipes/presign-img-url.pipe';
import { AuthService } from '../../core/services/auth.service';
import { DialogService } from '../../core/dialog.service';
import { ProfilesService } from '../profiles.service';
import { FileService } from '../../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HatApiService } from '../../core/services/hat-api.service';
import { HttpBackendClient } from '../../core/services/http-backend-client.service';
import { of } from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

const PROFILE_MOCK_DATA = {
  dateCreated: 0,
  shared: false,
  photo: {
    avatar: ''
  },
  personal: {
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
    nickName: '',
    birthDate: '',
    gender: '',
    ageGroup: ''
  },
  contact: {
    primaryEmail: '',
    alternativeEmail: '',
    mobile: '',
    landline: ''
  },
  emergencyContact: {
    firstName: '',
    lastName: '',
    mobile: '',
    relationship: ''
  },
  address: {
    city: '',
    county: '',
    country: ''
  },
  about: {
    title: '',
    body: ''
  },
  online: {
    website: '',
    blog: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    google: '',
    youtube: ''
  }
};

const PROFILE_SHARE_MOCK = {
  photo: { avatar: false },
  personal: {
    title: false, firstName: false, middleName: false, lastName: false,
    preferredName: false, nickName: false, birthDate: false, gender: false, ageGroup: false
  },
  contact: { primaryEmail: false, alternativeEmail: false, mobile: false, landline: false },
  emergencyContact: { firstName: false, lastName: false, mobile: false, relationship: false },
  address: { city: false, county: false, country: false },
  about: { title: false, body: false },
  online: { website: false, blog: false, facebook: false, twitter: false, linkedin: false, google: false, youtube: false }
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, CustomAngularMaterialModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ ProfileComponent, PrivacyToggleHelperComponent, PresignImgUrlPipe ],
      providers: [
        MatSnackBar,
        HttpBackendClient,
        { provide: HatApiService, useValue: {} },
        { provide: AuthService, useValue: {
          user$: of({ hatId: 'test', domain: '.hat.org', fullDomain: 'test.hat.org' })
        } },
        { provide: DialogService, useValue: {} },
        { provide: ProfilesService, useValue: {
          getProfileData: () => null,
          profileData$: of({ values: PROFILE_MOCK_DATA, share: PROFILE_SHARE_MOCK })
        } },
        { provide: FileService, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
