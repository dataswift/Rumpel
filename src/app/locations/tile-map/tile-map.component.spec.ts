/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMapComponent } from './tile-map.component';
import { TimeFilterTwoPipe } from '../../shared/pipes/time-filter-two.pipe';
import { MapComponent } from '../map/map.component';
import { LocationsService } from '../locations.service';
import { Observable } from 'rxjs/Observable';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';

describe('TileMapComponent', () => {
  let component: TileMapComponent;
  let fixture: ComponentFixture<TileMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ TileMapComponent, TimeFilterTwoPipe, MapComponent ],
      providers: [
        { provide: LocationsService, useValue: {
          loading$: Observable.of(false),
          data$: Observable.of([]),
          getInitData: () => null
        }}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
