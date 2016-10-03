/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotablesService } from './notables.service';

describe('Service: Notables', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotablesService]
    });
  });

  it('should ...', inject([NotablesService], (service: NotablesService) => {
    expect(service).toBeTruthy();
  }));
});
