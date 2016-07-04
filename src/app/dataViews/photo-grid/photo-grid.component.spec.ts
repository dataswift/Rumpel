/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PhotoGridComponent } from './photo-grid.component';

describe('Component: PhotoGrid', () => {
  it('should create an instance', () => {
    let component = new PhotoGridComponent();
    expect(component).toBeTruthy();
  });
});
