/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSocialComponent } from './tile-social.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { ReplaceCharsPipe } from '../../shared/pipes/replace-chars.pipe';
import { LimitContentPipe } from '../../shared/pipes/limit-content.pipe';
import { SocialService } from '../social.service';
import { TwitterService } from '../twitter.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TileSocialComponent', () => {
  let component: TileSocialComponent;
  let fixture: ComponentFixture<TileSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ TileSocialComponent, MomentPipe, ReplaceCharsPipe, LimitContentPipe ],
      providers: [
        { provide: SocialService, useValue: { getInitData: () => null, data$: of([]) } },
        { provide: TwitterService, useValue: { getInitData: () => null, data$: of([]) } },
        { provide: ActivatedRoute, useValue: { snapshot: { fragment: '1' } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
