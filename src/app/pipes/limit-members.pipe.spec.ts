/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { LimitMembersPipe } from './limit-members.pipe';

describe('Pipe: LimitMembers', () => {
  it('create an instance', () => {
    let pipe = new LimitMembersPipe();
    expect(pipe).toBeTruthy();
  });
});
