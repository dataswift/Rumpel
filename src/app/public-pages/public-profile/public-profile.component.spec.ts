/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileComponent } from './public-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../app.config';
import { AuthService } from '../../core/services/auth.service';
import { HatApiService } from '../../core/services/hat-api.service';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { RelativeTimePipe } from '../../shared/pipes/relative-time.pipe';
import { of } from 'rxjs';

describe('PublicProfileComponent', () => {
  let component: PublicProfileComponent;
  let fixture: ComponentFixture<PublicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PublicProfileComponent, SafeHtmlPipe, MarkdownToHtmlPipe, MomentPipe, RelativeTimePipe ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: AuthService, useValue: {
          auth$: of(false)
        } },
        { provide: HatApiService, useValue: {
          getPhataPage: () => of({})
        } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
