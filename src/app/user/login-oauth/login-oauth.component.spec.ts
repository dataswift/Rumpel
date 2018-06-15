/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOauthComponent } from './login-oauth.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { APP_CONFIG } from '../../app.config';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UnbundlePipe } from '../../shared/pipes/unbundle.pipe';
// tslint:disable-next-line:max-line-length
import { HatApplicationPermissionsComponent } from '../../shared/components/hat-application-permissions/hat-application-permissions.component';

describe('LoginOauthComponent', () => {
  let component: LoginOauthComponent;
  let fixture: ComponentFixture<LoginOauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ LoginOauthComponent, HatApplicationPermissionsComponent, UnbundlePipe ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
        { provide: AuthService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
