/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataPlugService } from './data-plug.service';

describe('DataPlugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPlugService]
    });
  });

  it('should ...', inject([DataPlugService], (service: DataPlugService) => {
    expect(service).toBeTruthy();
  }));
});
