/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import {HatClaimDetailsComponent} from "./hat-claim-details.component";

describe('HatClaimDetailsComponent', () => {
  let component: HatClaimDetailsComponent;
  let fixture: ComponentFixture<HatClaimDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, CustomAngularMaterialModule ],
      declarations: [ HatClaimDetailsComponent ],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatClaimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
