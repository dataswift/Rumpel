/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileProfileComponent } from './tile-profile.component';
import { ProfilesService } from '../profiles.service';
import { Observable } from 'rxjs/Observable';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';

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

describe('TileProfileComponent', () => {
  let component: TileProfileComponent;
  let fixture: ComponentFixture<TileProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ TileProfileComponent ],
      providers: [
        { provide: ProfilesService, useValue: {
          getProfileData: () => null,
          profileData$: Observable.of({ values: PROFILE_MOCK_DATA, share: PROFILE_SHARE_MOCK })
        } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
