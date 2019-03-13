import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageComponent } from './settings-page.component';
import { SettingsHeaderComponent } from '../settings-header/settings-header.component';
import { SettingsListComponent } from '../settings-list/settings-list.component';
import {PresignImgUrlPipe} from '../../shared/pipes/presign-img-url.pipe';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import {RouterModule} from '@angular/router';
import {HatApiService} from '../../core/services/hat-api.service';
import {AuthService} from '../../core/services/auth.service';
import {of} from 'rxjs';
import {ProfilesService} from '../../profiles/profiles.service';
import {APP_CONFIG} from '../../app.config';

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

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, RouterModule ],
      declarations: [
        SettingsHeaderComponent,
        SettingsPageComponent,
        SettingsListComponent,
        PresignImgUrlPipe
      ],
      providers: [
        { provide: HatApiService, useValue: {} },
        { provide: AuthService, useValue: {
            user$: of({ hatId: 'test', domain: '.hat.org', fullDomain: 'test.hat.org' })
          } },
        { provide: ProfilesService, useValue: {
            getProfileData: () => null,
            profileData$: of({ values: PROFILE_MOCK_DATA, share: PROFILE_SHARE_MOCK })
          } },
        { provide: APP_CONFIG, useValue: { mainMenu: [], appsMenu: [] } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
