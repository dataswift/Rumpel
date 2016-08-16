/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { NotesInputComponent } from './notes-input.component';

describe('Component: NotesInput', () => {
  it('should create an instance', () => {
    let component = new NotesInputComponent();
    expect(component).toBeTruthy();
  });
});
