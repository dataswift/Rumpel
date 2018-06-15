/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuComponent } from './side-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomAngularMaterialModule } from '../custom-angular-material.module';
import { APP_CONFIG } from '../../app.config';
import { HatApplicationsService } from '../../explore/hat-applications.service';
import { Observable } from 'rxjs/Observable';
import { DataOfferService } from '../../offers/data-offer.service';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, CustomAngularMaterialModule ],
      declarations: [ SideMenuComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: { menuItems: { private: [] }}},
        { provide: HatApplicationsService, useValue: { inactiveDataplugs$: Observable.of([]) } },
        { provide: DataOfferService, useValue: { offers$: Observable.of({ availableOffers: [] }), fetchUserAwareOfferList: () => null } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
