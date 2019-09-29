/*
 * Copyright (C) 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@dataswift.io> 2, 2019
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { HatClaimSubscriptionsComponent } from './hat-claim-subscriptions.component';
import { FormsModule } from '@angular/forms';

describe('HatClaimSubscriptionsComponent', () => {
  let component: HatClaimSubscriptionsComponent;
  let fixture: ComponentFixture<HatClaimSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, CustomAngularMaterialModule ],
      declarations: [ HatClaimSubscriptionsComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatClaimSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
