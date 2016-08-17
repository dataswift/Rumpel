/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { UiStateService } from './ui-state.service';

describe('UiState Service', () => {
  beforeEach(() => {
    addProviders([UiStateService]);
  });

  it('should ...',
    inject([UiStateService],
      (service: UiStateService) => {
        expect(service).toBeTruthy();
      }));
});
