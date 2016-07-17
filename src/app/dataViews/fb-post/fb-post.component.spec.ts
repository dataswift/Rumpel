/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FbPostComponent } from './fb-post.component';

describe('Component: FbPost', () => {
  it('should create an instance', () => {
    let component = new FbPostComponent();
    expect(component).toBeTruthy();
  });
});
