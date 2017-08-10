/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 7, 2017
 */

import { TestBed, inject } from '@angular/core/testing';

import { HatApiV2Service } from './hat-api-v2.service';

describe('HatApiV2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HatApiV2Service]
    });
  });

  it('should be created', inject([HatApiV2Service], (service: HatApiV2Service) => {
    expect(service).toBeTruthy();
  }));
});
