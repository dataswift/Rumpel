/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DataTypeFilterPipe } from './data-type-filter.pipe';

describe('Pipe: DataTypeFilter', () => {
  it('create an instance', () => {
    let pipe = new DataTypeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
