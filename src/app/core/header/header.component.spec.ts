/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../app.config';
import { DialogService } from '../dialog.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { CustomAngularMaterialModule } from '../custom-angular-material.module';
import { SystemStatusService } from '../../services/system-status.service';

const SYSTEM_STATUS_MOCK = {
  title: 'Previous Login',
  kind: {
    kind: 'Text',
    units: '',
    metric: '2 hours ago',
  }
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatMenuModule, MatIconModule, CustomAngularMaterialModule ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: DialogService, useValue: {} },
        { provide: SystemStatusService, useValue: {
            systemStatus$: of([SYSTEM_STATUS_MOCK])
          } },
        { provide: AuthService, useValue: { user$: of({}) } },
        { provide: ProfilesService, useValue: {
            getProfileData: () => null,
            getProfileInitData: () => null,
            data$: of({}) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
