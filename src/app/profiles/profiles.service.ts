/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { HatApiService } from '../services/hat-api.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../shared/interfaces/profile.interface';
import { ProfileHatModel } from './profile.hatmodel';
import {BaseRumpelDataService} from "../services/base-rumpel-data.service";

@Injectable()
export class ProfilesService extends BaseRumpelDataService<Profile> {
  constructor(hat: HatApiService,
              private auth: AuthService) {
    super(hat);

    this.ensureTableExists('profile', 'rumpel', ProfileHatModel.model);
  }

  getPicture() {
    return this.hat.getAllValuesOf('profile_picture', 'facebook')
      .map(pictures => {
        const sortedPictures = pictures.sort((a, b) => {
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        });

        return sortedPictures[0];
      });
  }

  mapData(rawProfile) {
    let coreData = rawProfile.data.profile;
    return {
      private: coreData.private === 'true',
      fb_profile_photo: { private: coreData.fb_profile_photo.private === 'true' },
      personal: {
        title: coreData.personal.title,
        first_name: coreData.personal.first_name,
        middle_name: coreData.personal.middle_name,
        last_name: coreData.personal.last_name,
        preferred_name: coreData.personal.preferred_name,
        private: coreData.personal.private === 'true' },
      nick: { name: coreData.nick.name, private: coreData.nick.private === 'true' },
      birth: { date: coreData.birth.date, private: coreData.birth.private === 'true' },
      gender: { type: coreData.gender.type, private: coreData.gender.private === 'true' },
      age: { group: coreData.age.group, private: coreData.age.private === 'true' },
      primary_email: { value: coreData.primary_email.value, private: coreData.primary_email.private === 'true' },
      alternative_email: { value: coreData.alternative_email.value, private: coreData.alternative_email.private === 'true' },
      home_phone: { no: coreData.home_phone.no, private: coreData.home_phone.private === 'true' },
      mobile: { no: coreData.mobile.no, private: coreData.mobile.private === 'true' },
      address_details: {
        no: coreData.address_details.no,
        street: coreData.address_details.street,
        postcode: coreData.address_details.postcode,
        private: coreData.address_details.private === 'true' },
      address_global: {
        city: coreData.address_global.city,
        county: coreData.address_global.county,
        country: coreData.address_global.country,
        private: coreData.address_global.private === 'true' },
      website: { link: coreData.website.link, private: coreData.website.private === 'true' },
      blog: { link: coreData.blog.link, private: coreData.blog.private === 'true' },
      facebook: { link: coreData.facebook.link, private: coreData.facebook.private === 'true' },
      linkedin: { link: coreData.linkedin.link, private: coreData.linkedin.private === 'true' },
      twitter: { link: coreData.twitter.link, private: coreData.twitter.private === 'true' },
      google: { link: coreData.google.link, private: coreData.google.private === 'true' },
      youtube: { link: coreData.youtube.link, private: coreData.youtube.private === 'true' },
      emergency_contact: {
        first_name: coreData.emergency_contact.first_name,
        last_name: coreData.emergency_contact.last_name,
        mobile: coreData.emergency_contact.mobile,
        relationship: coreData.emergency_contact.relationship,
        private: coreData.emergency_contact.private === 'true' },
      about: { title: coreData.about.title, body: coreData.about.body, private: coreData.about.private === 'true' }
    };
  }

}
