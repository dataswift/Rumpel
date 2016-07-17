/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { TimeFilterPipe } from './time-filter.pipe';

describe('Pipe: TimeFilter', () => {
  it('create an instance', () => {
    let pipe = new TimeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
