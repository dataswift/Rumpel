/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseDataService } from './base-data.service';

describe('BaseDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseDataService]
    });
  });

  it('should ...', inject([BaseDataService], (service: BaseDataService) => {
    expect(service).toBeTruthy();
  }));
});
