/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io>
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileDataDebitComponent } from './tile-data-debit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataDebitService } from '../data-debits.service';
import { of } from 'rxjs';
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
        { provide: DataDebitService, useValue: { loadAllDataDebits: () => of([]) } },
        { provide: AuthService, useValue: { auth$: of('') } }
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
