/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DataPointComponent } from './data-point.component';

describe('Component: DataPoint', () => {
  it('should create an instance', () => {
    let component = new DataPointComponent();
    expect(component).toBeTruthy();
  });
});
