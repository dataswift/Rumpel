/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Eleftherios Myteletsis <eleftherios.myteletsis@gmail.com> 3, 2019
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFooterComponent } from './settings-footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';

describe('SettingsFooterComponent', () => {
  let component: SettingsFooterComponent;
  let fixture: ComponentFixture<SettingsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsFooterComponent ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: AuthService, useValue: {
            user$: of({ hatId: 'test', domain: '.hat.org', fullDomain: 'test.hat.org' })
          } }
          ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
