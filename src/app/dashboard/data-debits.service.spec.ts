/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io>
 */

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataDebitService } from './data-debits.service';
import { HatApiService } from '../core/services/hat-api.service';

describe('DataDebitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataDebitService,
        { provide: HatApiService, useValue: {} }
      ]
    });
  });

  it('should ...', inject([DataDebitService], (service: DataDebitService) => {
    expect(service).toBeTruthy();
  }));
});
