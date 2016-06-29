/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { TileMapComponent } from './tile-map.component';

describe('Component: TileMap', () => {
  it('should create an instance', () => {
    let component = new TileMapComponent();
    expect(component).toBeTruthy();
  });
});
