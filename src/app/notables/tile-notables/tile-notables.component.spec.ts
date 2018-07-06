/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileNotablesComponent } from './tile-notables.component';
import { InputBoxComponent } from '../input-box/input-box.component';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NotablesService } from '../notables.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { AuthService } from '../../core/services/auth.service';
import { LocationsService } from '../../locations/locations.service';
import { of } from 'rxjs';

describe('TileNotablesComponent', () => {
  let component: TileNotablesComponent;
  let fixture: ComponentFixture<TileNotablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ TileNotablesComponent, InputBoxComponent, MomentPipe, MarkdownToHtmlPipe ],
      providers: [
        { provide: NotablesService, useValue: { getInitData: () => null, data$: of([]) } },
        { provide: ProfilesService, useValue: { profileData$: of([])} },
        { provide: AuthService, useValue: { user$: of({ fullDomain: 'testing.hat.org' })} },
        { provide: LocationsService, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileNotablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
