/*
 * Copyright (C) 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Eleftherios Myteletsis <eleftherios.myteletsis@dataswift.io> 3, 2019
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHeaderComponent } from './settings-header.component';
import { PresignImgUrlPipe } from '../../shared/pipes/presign-img-url.pipe';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { HatApiService } from '../../core/services/hat-api.service';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { ProfilesService } from '../../profiles/profiles.service';
import { SystemStatusService } from '../../services/system-status.service';

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

const SYSTEM_STATUS_MOCK = {
  title: '',
  kind: {
    kind: '',
    units: '',
    metric: '',
  }
};

describe('SettingsHeaderComponent', () => {
  let component: SettingsHeaderComponent;
  let fixture: ComponentFixture<SettingsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomAngularMaterialModule
      ],
      declarations: [
        SettingsHeaderComponent,
        PresignImgUrlPipe
      ],
      providers: [
        { provide: HatApiService, useValue: {} },
        { provide: SystemStatusService, useValue: {
            systemStatus$: of([ { SYSTEM_STATUS_MOCK } ])
        }},
        { provide: AuthService, useValue: {
            user$: of({ hatId: 'test', domain: '.hat.org', fullDomain: 'test.hat.org' })
          } },
        { provide: ProfilesService, useValue: {
            getProfileData: () => null,
            data$: of({ values: PROFILE_MOCK_DATA, share: PROFILE_SHARE_MOCK })
          } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
