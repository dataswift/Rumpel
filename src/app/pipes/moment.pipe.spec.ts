import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Moment } from './moment.pipe';

describe('Moment Pipe', () => {
  beforeEachProviders(() => [Moment]);

  it('should transform the input', inject([Moment], (pipe: Moment) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
