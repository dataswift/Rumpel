/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { IssueComponent } from './issue.component';

describe('Component: Issue', () => {
  it('should create an instance', () => {
    let component = new IssueComponent();
    expect(component).toBeTruthy();
  });
});
