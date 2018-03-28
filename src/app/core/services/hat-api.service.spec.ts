/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 7, 2017
 */

import { TestBed, inject } from '@angular/core/testing';

import { HatApiService } from './hat-api.service';
import { APP_CONFIG } from '../../app.config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpBackendClient } from './http-backend-client.service';

describe('HatApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HatApiService,
        HttpBackendClient,
        { provide: APP_CONFIG, useValue: { name: '' } }
      ]
    });
  });

  it('should be created', inject([HatApiService], (service: HatApiService) => {
    expect(service).toBeTruthy();
  }));
});
