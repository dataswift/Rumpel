/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { LocationFilterPipe } from './location-filter.pipe';

describe('Pipe: LocationFilter', () => {
  it('create an instance', () => {
    let pipe = new LocationFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
