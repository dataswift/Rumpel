/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNativeComponent } from './login-native.component';
import { FormsModule } from '@angular/forms';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../app.config';
import { ActivatedRoute } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs/Observable';

describe('LoginNativeComponent', () => {
  let component: LoginNativeComponent;
  let fixture: ComponentFixture<LoginNativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, CustomAngularMaterialModule, RouterTestingModule ],
      declarations: [ LoginNativeComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
        { provide: BrowserStorageService, useValue: {} },
        { provide: AuthService, useValue: { auth$: Observable.of(false) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
