/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

export const NotablesHatModel = {
  metadata: {
    version: '1.1.0'
  },
  model: {
    name: 'notablesv1',
    source: 'rumpel',
    fields: [
      { name: 'message' },
      { name: 'kind' },
      { name: 'created_time' },
      { name: 'updated_time' },
      { name: 'public_until' },
      { name: 'shared' },
      { name: 'shared_on' }
    ],
    subTables: [
      {
        name: 'authorv1',
        source: 'rumpel',
        fields: [
          { name: 'id' },
          { name: 'name' },
          { name: 'nick' },
          { name: 'phata' },
          { name: 'photo_url' }
        ]
      },
      {
        name: 'locationv1',
        source: 'rumpel',
        fields: [
          { name: 'latitude' },
          { name: 'longitude' },
          { name: 'accuracy' },
          { name: 'altitude' },
          { name: 'altitude_accuracy' },
          { name: 'heading' },
          { name: 'speed' },
          { name: 'shared' }
        ]
      },
      {
        name: 'photov1',
        source: 'rumpel',
        fields: [
          { name: 'link' },
          { name: 'source' },
          { name: 'caption' },
          { name: 'shared' }
        ]
      }
    ]
  }
};
