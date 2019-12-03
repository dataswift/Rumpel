/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { ActivityListComponent } from './activity-list.component';
import { LocationNotableComponent } from '../../shared/components/location-notable/location-notable.component';
import { LimitContentPipe } from '../../shared/pipes/limit-content.pipe';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { RelativeTimePipe } from '../../shared/pipes/relative-time.pipe';
import { RemoveCharsPipe } from '../../shared/pipes/removeChars.pipe';
import { SheFeedItemComponent } from '../../shared/components/she-feed-item/she-feed-item.component';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [
        ActivityListComponent,
        LocationNotableComponent,
        LimitContentPipe,
        MomentPipe,
        SafeHtmlPipe,
        MarkdownToHtmlPipe,
        RelativeTimePipe,
        RemoveCharsPipe,
        SheFeedItemComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
