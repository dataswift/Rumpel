/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { Moment } from './moment.pipe';

describe('Moment Pipe', () => {
  it('create an instance', () => {
    let pipe = new Moment();
    expect(pipe).toBeTruthy();
  });
});
