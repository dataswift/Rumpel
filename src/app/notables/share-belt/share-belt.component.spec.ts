/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBeltComponent } from './share-belt.component';
import { APP_CONFIG } from '../../app.config';
import { DialogService } from '../../core/dialog.service';
import { HatApplicationsService } from '../../explore/hat-applications.service';
import { of } from 'rxjs';
import { Notable } from '../../shared/interfaces/notable.class';

describe('ShareBeltComponent', () => {
  let component: ShareBeltComponent;
  let fixture: ComponentFixture<ShareBeltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareBeltComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: DialogService, useValue: {} },
        { provide: HatApplicationsService, useValue: { getApplicationDetails: () => of({ active: true }) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBeltComponent);
    component = fixture.componentInstance;
    component.currentNotable = new Notable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
