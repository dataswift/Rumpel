/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MomentPipe } from './moment.pipe';

describe('Moment Pipe', () => {
  it('create an instance', () => {
    let pipe = new MomentPipe();
    expect(pipe).toBeTruthy();
  });
});
