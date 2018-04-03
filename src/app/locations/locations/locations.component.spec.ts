/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { MapComponent } from '../map/map.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { LocationsService } from '../locations.service';
import { Observable } from 'rxjs/Observable';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ LocationsComponent, PageHeaderComponent, MapComponent, SpinnerComponent ],
      providers: [
        { provide: LocationsService, useValue: {
          loading$: Observable.of(false),
          data$: Observable.of([]),
          getMoreData: () => null
        }}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
