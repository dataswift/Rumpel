/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { UiStateService } from './ui-state.service';

describe('UiState Service', () => {
  beforeEachProviders(() => [UiStateService]);

  it('should ...',
      inject([UiStateService], (service: UiStateService) => {
    expect(service).toBeTruthy();
  }));
});
