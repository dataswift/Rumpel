/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotablesMdEditorComponent } from './notables-md-editor.component';
import { ShareBeltComponent } from '../share-belt/share-belt.component';
import { NotablesService } from '../notables.service';
import { LocationsService } from '../../locations/locations.service';
import { FileService } from '../../services/file.service';
import { DialogService } from '../../core/dialog.service';
import { Observable } from 'rxjs/Observable';

xdescribe('NotablesMdEditorComponent', () => {
  let component: NotablesMdEditorComponent;
  let fixture: ComponentFixture<NotablesMdEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotablesMdEditorComponent, ShareBeltComponent ],
      providers: [
        { provide: NotablesService, useValue: { data$: Observable.of([]) } },
        { provide: LocationsService, userValue: { data$: Observable.of([]) } },
        { provide: FileService, useValue: { } },
        { provide: DialogService, useValue: { } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotablesMdEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
