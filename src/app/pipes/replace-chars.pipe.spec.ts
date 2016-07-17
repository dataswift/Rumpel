/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ReplaceCharsPipe } from './replace-chars.pipe';

describe('Pipe: Contains', () => {
  it('create an instance', () => {
    let pipe = new ReplaceCharsPipe();
    expect(pipe).toBeTruthy();
  });
});
