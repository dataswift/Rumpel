/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Inject, Injectable } from '@angular/core';
import { HatApiV2Service } from '../services/hat-api-v2.service';
import { BaseDataService } from '../services/base-data.service';
import { UserService } from '../user/user.service';

import { Profile } from '../shared/interfaces/profile.interface';
import { HatRecord } from '../shared/interfaces/hat-record.interface';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfilesService extends BaseDataService<Profile> {
  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              hat: HatApiV2Service,
              userSvc: UserService) {
    super(hat, userSvc, config.name.toLowerCase(), 'profile', 'dateCreated');
  }

  get profileData$(): Observable<HatRecord<Profile>[]> {
    const defaultProfile = {
      endpoint: '',
      recordId: '',
      data: {
        dateCreated: 0,
        shared: false,
        profilePhoto: {value: '', shared: false},
        personal: {
          title: {value: '', shared: false},
          firstName: {value: '', shared: false},
          middleName: {value: '', shared: false},
          lastName: {value: '', shared: false},
          preferredName: {value: '', shared: false},
          nickName: {value: '', shared: false},
          birthDate: {value: '', shared: false},
          gender: {value: '', shared: false},
          ageGroup: {value: '', shared: false}
        },
        contact: {
          primaryEmail: {value: '', shared: false},
          alternativeEmail: {value: '', shared: false},
          mobile: {value: '', shared: false},
          landline: {value: '', shared: false}
        },
        emergencyContact: {
          firstName: {value: '', shared: false},
          lastName: {value: '', shared: false},
          mobile: {value: '', shared: false},
          relationship: {value: '', shared: false}
        },
        address: {
          addressLine1: {value: '', shared: false},
          addressLine2: {value: '', shared: false},
          city: {value: '', shared: false},
          postcode: {value: '', shared: false},
          county: {value: '', shared: false},
          country: {value: '', shared: false}
        },
        about: {
          title: {value: '', shared: false},
          body: {value: '', shared: false}
        },
        online: {
          website: {value: '', shared: false},
          blog: {value: '', shared: false},
          facebook: {value: '', shared: false},
          twitter: {value: '', shared: false},
          linkedin: {value: '', shared: false},
          google: {value: '', shared: false},
          youtube: {value: '', shared: false}
        }
      }
    };

    return this.data$
      .startWith([defaultProfile])
      .filter(profile => profile.length > 0);
  }

  coerceType(rawProfile: HatRecord<any>): HatRecord<Profile> {
    const coreData = rawProfile.data.profile || rawProfile.data;

    return {
      endpoint: rawProfile.endpoint,
      recordId: rawProfile.recordId,
      data: {
        dateCreated: coreData.dateCreated,
        shared: coreData.shared,
        profilePhoto: {value: coreData.profilePhoto, shared: false},
        personal: {
          title: {value: coreData.personal.title, shared: false},
          firstName: {value: coreData.personal.firstName, shared: false},
          middleName: {value: coreData.personal.middleName, shared: false},
          lastName: {value: coreData.personal.lastName, shared: false},
          preferredName: {value: coreData.personal.preferred_name, shared: false},
          nickName: {value: coreData.personal.nickName, shared: false},
          birthDate: {value: coreData.personal.birthDate, shared: false},
          gender: {value: coreData.personal.gender, shared: false},
          ageGroup: {value: coreData.personal.ageGroup, shared: false}
        },
        contact: {
          primaryEmail: {value: coreData.contact.primaryEmail, shared: false},
          alternativeEmail: {value: coreData.contact.alternativeEmail, shared: false},
          mobile: {value: coreData.contact.mobile, shared: false},
          landline: {value: coreData.contact.landline, shared: false}
        },
        emergencyContact: {
          firstName: {value: coreData.emergencyContact.firstName, shared: false},
          lastName: {value: coreData.emergencyContact.lastName, shared: false},
          mobile: {value: coreData.emergencyContact.mobile, shared: false},
          relationship: {value: coreData.emergencyContact.relationship, shared: false}
        },
        address: {
          addressLine1: {value: coreData.address.addressLine1, shared: false},
          addressLine2: {value: coreData.address.addressLine2, shared: false},
          city: {value: coreData.address.city, shared: false},
          postcode: {value: coreData.address.postcode, shared: false},
          county: {value: coreData.address.county, shared: false},
          country: {value: coreData.address.country, shared: false}
        },
        about: {
          title: {value: coreData.about.title, shared: false},
          body: {value: coreData.about.body, shared: false}
        },
        online: {
          website: {value: coreData.online.website, shared: false},
          blog: {value: coreData.online.blog, shared: false},
          facebook: {value: coreData.online.facebook, shared: false},
          twitter: {value: coreData.online.twitter, shared: false},
          linkedin: {value: coreData.online.linkedin, shared: false},
          google: {value: coreData.online.google, shared: false},
          youtube: {value: coreData.online.youtube, shared: false}
        }
      }
    };
  }

}
