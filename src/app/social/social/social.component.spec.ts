/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialComponent } from './social.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { FilterByPipe } from '../../shared/pipes/filter-by.pipe';
import { FbPostComponent } from '../fb-post/fb-post.component';
import { TweetComponent } from '../tweet/tweet.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { ReplaceCharsPipe } from '../../shared/pipes/replace-chars.pipe';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import {SocialService} from '../social.service';
import {TwitterService} from '../twitter.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [
        SocialComponent,
        PageHeaderComponent,
        FilterByPipe,
        FbPostComponent,
        TweetComponent,
        MomentPipe,
        ReplaceCharsPipe,
        SafeHtmlPipe
      ],
      providers: [
        { provide: SocialService, useValue: { getInitData: () => null, data$: Observable.of([]) } },
        { provide: TwitterService, useValue: { getInitData: () => null, data$: Observable.of([]) } },
        { provide: ActivatedRoute, useValue: { snapshot: { fragment: '1' } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
