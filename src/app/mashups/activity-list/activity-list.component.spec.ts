/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';

import { ActivityListComponent } from './activity-list.component.ts';

describe('Component: TimelineView', () => {
  it('should create an instance', () => {
    let component = new ActivityListComponent();
    expect(component).toBeTruthy();
  });
});
