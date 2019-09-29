/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbPostComponent } from './fb-post.component';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { ReplaceCharsPipe } from '../../shared/pipes/replace-chars.pipe';

xdescribe('FbPostComponent', () => {
  let component: FbPostComponent;
  let fixture: ComponentFixture<FbPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbPostComponent, MomentPipe, ReplaceCharsPipe ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
