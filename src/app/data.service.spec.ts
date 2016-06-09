import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { DataService } from './data.service';

describe('Data Service', () => {
  beforeEachProviders(() => [DataService]);

  it('should ...',
      inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
