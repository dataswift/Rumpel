/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

export interface Profile {
  dateCreated: number;
  shared: boolean;
  profilePhoto: ShareableDataItem;
  personal: {
    title: ShareableDataItem;
    firstName: ShareableDataItem;
    middleName: ShareableDataItem;
    lastName: ShareableDataItem;
    preferredName: ShareableDataItem;
    nickName: ShareableDataItem;
    birthDate: ShareableDataItem;
    gender: ShareableDataItem;
    ageGroup: ShareableDataItem;
  };
  contact: {
    primaryEmail: ShareableDataItem;
    alternativeEmail: ShareableDataItem;
    mobile: ShareableDataItem;
    landline: ShareableDataItem;
  };
  address: {
    addressLine1: ShareableDataItem;
    addressLine2: ShareableDataItem;
    city: ShareableDataItem;
    postcode: ShareableDataItem;
    county: ShareableDataItem;
    country: ShareableDataItem;
  };
  about: {
    title: ShareableDataItem;
    body: ShareableDataItem;
  }
}

export interface ShareableDataItem {
  value: string;
  shared: boolean;
}
