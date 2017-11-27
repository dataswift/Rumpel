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
        }
      }
    };
  }

}

//   primary_email: { value: coreData.primary_email.value, private: coreData.primary_email.private === 'true' },
//   alternative_email: { value: coreData.alternative_email.value, private: coreData.alternative_email.private === 'true' },
//   home_phone: { no: coreData.home_phone.no, private: coreData.home_phone.private === 'true' },
//   mobile: { no: coreData.mobile.no, private: coreData.mobile.private === 'true' },
//   address_details: {
//     no: coreData.address_details.no,
//     street: coreData.address_details.street,
//     postcode: coreData.address_details.postcode,
//     private: coreData.address_details.private === 'true' },
//   address_global: {
//     city: coreData.address_global.city,
//     county: coreData.address_global.county,
//     country: coreData.address_global.country,
//     private: coreData.address_global.private === 'true' },
//   website: { link: coreData.website.link, private: coreData.website.private === 'true' },
//   blog: { link: coreData.blog.link, private: coreData.blog.private === 'true' },
//   facebook: { link: coreData.facebook.link, private: coreData.facebook.private === 'true' },
//   linkedin: { link: coreData.linkedin.link, private: coreData.linkedin.private === 'true' },
//   twitter: { link: coreData.twitter.link, private: coreData.twitter.private === 'true' },
//   google: { link: coreData.google.link, private: coreData.google.private === 'true' },
//   youtube: { link: coreData.youtube.link, private: coreData.youtube.private === 'true' },
//   emergency_contact: {
//     first_name: coreData.emergency_contact.first_name,
//     last_name: coreData.emergency_contact.last_name,
//     mobile: coreData.emergency_contact.mobile,
//     relationship: coreData.emergency_contact.relationship,
//     private: coreData.emergency_contact.private === 'true' },
//   about: {
//     title: coreData.about.title,
//     body: coreData.about.body,
//     private: coreData.about.private === 'true'
//   }
// }
