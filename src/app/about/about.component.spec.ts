/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('Component: About', () => {
  it('should create an instance', () => {
    let component = new AboutComponent();
    expect(component).toBeTruthy();
  });
});
