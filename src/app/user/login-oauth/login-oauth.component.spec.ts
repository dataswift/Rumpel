/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 4, 2017
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOauthComponent } from './login-oauth.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { APP_CONFIG } from '../../app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UnbundlePipe } from '../../shared/pipes/unbundle.pipe';
// tslint:disable-next-line:max-line-length
import { HatAppUpdateNotesComponent } from '../../shared/components/hat-app-update-notes/hat-app-update-notes.component';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { SafeHtmlPipe } from '../../shared/pipes';
import { CacheService } from '../../core/services/cache.service';
import { HmiBaasContentComponent } from '../../hmi/hmi-baas-content/hmi-baas-content.component';
import { HmiPermissionsListComponent } from '../../hmi/hmi-permissions-list/hmi-permissions-list.component';
import { HmiDataPlugComponent } from '../../hmi/hmi-shared-components/hmi-data-plug/hmi-data-plug.component';
import { HmiDataDebitComponent } from '../../hmi/hmi-shared-components/hmi-data-debit/hmi-data-debit.component';
import { HmiRatingComponent } from '../../hmi/hmi-shared-components/hmi-rating/hmi-rating.component';

describe('LoginOauthComponent', () => {
  let component: LoginOauthComponent;
  let fixture: ComponentFixture<LoginOauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [
        LoginOauthComponent, HatAppUpdateNotesComponent, UnbundlePipe, HmiDataPlugComponent, HmiDataDebitComponent,
        MarkdownToHtmlPipe, HmiBaasContentComponent, SafeHtmlPipe, HmiPermissionsListComponent, HmiRatingComponent,
      ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
        { provide: AuthService, useValue: {} },
        { provide: CacheService, useValue: {} },
        { provide: Router, useValue: { navigate: () => {} } }
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
