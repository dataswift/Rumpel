/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugsComponent } from './data-plugs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataPlugService } from '../data-plug.service';
import { Observable } from 'rxjs/Observable';

describe('DataPlugsComponent', () => {
  let component: DataPlugsComponent;
  let fixture: ComponentFixture<DataPlugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DataPlugsComponent ],
      providers: [{ provide: DataPlugService, useValue: { dataplugs$: Observable.of([]) } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
