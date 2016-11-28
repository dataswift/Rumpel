/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataDebitService } from './data-debits.service';

describe('DataDebitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataDebitService]
    });
  });

  it('should ...', inject([DataDebitService], (service: DataDebitService) => {
    expect(service).toBeTruthy();
  }));
});
