/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRumpelDataService } from './base-rumpel-data.service';

describe('BaseRumpelDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseRumpelDataService]
    });
  });

  it('should ...', inject([BaseRumpelDataService], (service: BaseRumpelDataService) => {
    expect(service).toBeTruthy();
  }));
});
