/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotablesService } from './notables.service';
import { HatApiService } from '../core/services/hat-api.service';
import { DexApiService } from '../services/dex-api.service';
import { AuthService } from '../core/services/auth.service';
import { APP_CONFIG } from '../app.config';
import { of } from 'rxjs';

describe('NotablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotablesService,
        { provide: APP_CONFIG, useValue: { } },
        { provide: HatApiService, useValue: {} },
        { provide: DexApiService, useValue: {} },
        { provide: AuthService, useValue: {
          user$: of({ fullDomain: 'testing.hat.org' }),
          auth$: of(false)
        } }
      ]
    });
  });

  it('should ...', inject([NotablesService], (service: NotablesService) => {
    expect(service).toBeTruthy();
  }));
});
