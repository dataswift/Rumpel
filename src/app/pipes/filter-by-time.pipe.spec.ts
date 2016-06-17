import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { FilterByTime } from './filter-by-time.pipe';

describe('FilterByTime Pipe', () => {
  beforeEachProviders(() => [FilterByTime]);

  it('should transform the input', inject([FilterByTime], (pipe: FilterByTime) => {
      expect(pipe.transform([])).toBe([]);
  }));
});
