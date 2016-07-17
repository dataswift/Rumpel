/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ExtractContentPipe } from './extract-content.pipe';

describe('Pipe: ExtractContent', () => {
  it('create an instance', () => {
    let pipe = new ExtractContentPipe();
    expect(pipe).toBeTruthy();
  });
});
