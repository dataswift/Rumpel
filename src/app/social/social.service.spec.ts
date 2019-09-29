/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocialService } from './social.service';
import { HatApiService } from '../core/services/hat-api.service';
import { AuthService } from '../core/services/auth.service';
import { of } from 'rxjs';

describe('SocialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocialService,
        { provide: HatApiService, useValue: {} },
        { provide: AuthService, useValue: { auth$: of(false)} }
      ]
    });
  });

  it('should ...', inject([SocialService], (service: SocialService) => {
    expect(service).toBeTruthy();
  }));
});
