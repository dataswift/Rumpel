/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { LimitContentPipe } from './limit-content.pipe';

describe('Pipe: LimitContent', () => {
  it('create an instance', () => {
    let pipe = new LimitContentPipe();
    expect(pipe).toBeTruthy();
  });
});
