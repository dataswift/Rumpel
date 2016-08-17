/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DataDebitService } from './data-debit.service';

describe('DataDebit Service', () => {
  beforeEach(() => {
    addProviders([DataDebitService]);
  });

  it('should ...',
    inject([DataDebitService],
      (service: DataDebitService) => {
        expect(service).toBeTruthy();
      }));
});
