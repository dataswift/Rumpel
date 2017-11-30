/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

export interface ProfileSharingConfig {
  photo: {
    avatar: boolean;
  };
  personal: {
    title: boolean;
    firstName: boolean;
    middleName: boolean;
    lastName: boolean;
    preferredName: boolean;
    nickName: boolean;
    birthDate: boolean;
    gender: boolean;
    ageGroup: boolean;
  };
  contact: {
    primaryEmail: boolean;
    alternativeEmail: boolean;
    mobile: boolean;
    landline: boolean;
  };
  emergencyContact: {
    firstName: boolean;
    lastName: boolean;
    mobile: boolean;
    relationship: boolean;
  };
  address: {
    city: boolean;
    county: boolean;
    country: boolean;
  };
  about: {
    title: boolean;
    body: boolean;
  };
  online: {
    website: boolean;
    blog: boolean;
    facebook: boolean;
    twitter: boolean;
    linkedin: boolean;
    google: boolean;
    youtube: boolean;
  };
}

export interface Profile {
  dateCreated: number;
  shared: boolean;
  photo: {
    avatar: string;
  };
  personal: {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    nickName: string;
    birthDate: string;
    gender: string;
    ageGroup: string;
  };
  contact: {
    primaryEmail: string;
    alternativeEmail: string;
    mobile: string;
    landline: string;
  };
  emergencyContact: {
    firstName: string;
    lastName: string;
    mobile: string;
    relationship: string;
  };
  address: {
    city: string;
    county: string;
    country: string;
  };
  about: {
    title: string;
    body: string;
  };
  online: {
    website: string;
    blog: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    google: string;
    youtube: string;
  };
}
