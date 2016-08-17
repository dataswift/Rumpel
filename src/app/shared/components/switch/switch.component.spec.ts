/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';

describe('Component: Switch', () => {
  it('should create an instance', () => {
    let component = new SwitchComponent();
    expect(component).toBeTruthy();
  });
});
