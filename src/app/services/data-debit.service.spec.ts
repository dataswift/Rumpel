/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DataDebitService } from './data-debit.service';

describe('DataDebit Service', () => {
  beforeEachProviders(() => [DataDebitService]);

  it('should ...',
      inject([DataDebitService], (service: DataDebitService) => {
    expect(service).toBeTruthy();
  }));
});
