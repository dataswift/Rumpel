/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileDataDebitComponent } from './tile-data-debit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataDebitService } from '../data-debits.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/services/auth.service';
import { MomentPipe } from '../../shared/pipes/moment.pipe';

describe('TileDataDebitComponent', () => {
  let component: TileDataDebitComponent;
  let fixture: ComponentFixture<TileDataDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ TileDataDebitComponent, MomentPipe ],
      providers: [
        { provide: DataDebitService, useValue: { loadAllDataDebits: () => Observable.of([]) } },
        { provide: AuthService, useValue: { auth$: Observable.of('') } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileDataDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
