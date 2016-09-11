/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { WithObjectPipe } from './with-object.pipe';

describe('Pipe: WithObject', () => {
  it('create an instance', () => {
    let pipe = new WithObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
