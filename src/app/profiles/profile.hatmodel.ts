/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

export const ProfileHatModel = {
  metadata: {
    version: "1.0.0"
  },
  model: {
    name: "profile",
    source: "rumpel",
    fields: [
      { name: "private" }
    ],
    subTables: [
      {
        name: "fb_profile_photo",
        source: "rumpel",
        fields: [
          { name: "private" }
        ]
      }, {
        name: "personal",
        source: "rumpel",
        fields: [
          { name: "title" },
          { name: "first_name" },
          { name: "middle_name" },
          { name: "last_name" },
          { name: "preferred_name" },
          { name: "private" }
        ]
      }, {
        name: "nick",
        source: "rumpel",
        fields: [
          { name: "name" },
          { name: "private" }
        ]
      }, {
        name: "birth",
        source: "rumpel",
        fields: [
          { name: "date" },
          { name: "private" }
        ]
      }, {
        name: "gender",
        source: "rumpel",
        fields: [
          { name: "type" },
          { name: "private" }
        ]
      }, {
        name: "age",
        source: "rumpel",
        fields: [
          { name: "group" },
          { name: "private" }
        ]
      }, {
        name: "primary_email",
        source: "rumpel",
        fields: [
          { name: "value" },
          { name: "private" }
        ]
      }, {
        name: "alternative_email",
        source: "rumpel",
        fields: [
          { name: "value" },
          { name: "private" }
        ]
      }, {
        name: "home_phone",
        source: "rumpel",
        fields: [
          { name: "no" },
          { name: "private" }
        ]
      }, {
        name: "mobile",
        source: "rumpel",
        fields: [
          { name: "no" },
          { name: "private" }
        ]
      }, {
        name: "address_details",
        source: "rumpel",
        fields: [
          { name: "no" },
          { name: "street" },
          { name: "postcode" },
          { name: "private" }
        ]
      }, {
        name: "address_global",
        source: "rumpel",
        fields: [
          { name: "city" },
          { name: "county" },
          { name: "country" },
          { name: "private" }
        ]
      }, {
        name: "website",
        source: "rumpel",
        fields: [
          { name: "link" },
          { name: "private" }
        ]
      }, {
        name: "blog",
        source: "rumpel",
        fields: [
          { name: "link" },
          { name: "private" }
        ]
      }, {
        name: "facebook",
        source: "rumpel",
        fields: [
          { name: "link" },
          { name: "private" }
        ]
      }, {
        name: "linkedin",
        source: "rumpel",
        fields: [
          { name: "link" },
          { name: "private" }
        ]
      }, {
        name: "twitter",
        source: "rumpel",
        fields: [
          { name: "link" },
          { name: "private" }
        ]
      }, {
        name: "google",
        source: "rumpel",
        fields: [
          { name: "link" },
          { name: "private" }
        ]
      }, {
        name: "youtube",
        source: "rumpel",
        fields: [
          { name: "link" },
          { name: "private" }
        ]
      }, {
        name: "emergency_contact",
        source: "rumpel",
        fields: [
          { name: "first_name" },
          { name: "last_name" },
          { name: "mobile" },
          { name: "relationship" },
          { name: "private" }
        ]
      }, {
        name: "about",
        source: "rumpel",
        fields: [
          { name: "title" },
          { name: "body" },
          { name: "private" }
        ]
      }
    ]
  }
};
