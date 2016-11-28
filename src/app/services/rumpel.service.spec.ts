/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RumpelService } from './rumpel.service';

describe('RumpelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RumpelService]
    });
  });

  it('should ...', inject([RumpelService], (service: RumpelService) => {
    expect(service).toBeTruthy();
  }));
});
