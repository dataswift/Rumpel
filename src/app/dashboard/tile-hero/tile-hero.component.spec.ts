/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileHeroComponent } from './tile-hero.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { ProfilesService } from '../../profiles/profiles.service';
import { DialogService } from '../../core/dialog.service';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs/Observable';

describe('TileHeroComponent', () => {
  let component: TileHeroComponent;
  let fixture: ComponentFixture<TileHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ TileHeroComponent ],
      providers: [
        { provide: ProfilesService, useValue: { profileData$: Observable.of(null) } },
        { provide: DialogService, useValue: { createDialog: () => null } },
        { provide: UserService, userValue: { user$: Observable.of({ authenticated: false, fullDomain: '' }) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
