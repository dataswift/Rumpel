/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCentreComponent } from './notification-centre.component';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { NotificationsService } from '../notifications.service';
import { of } from 'rxjs';

describe('NotificationCentreComponent', () => {
  let component: NotificationCentreComponent;
  let fixture: ComponentFixture<NotificationCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCentreComponent, MarkdownToHtmlPipe, MomentPipe ],
      providers: [
        { provide: NotificationsService, useValue: {
          notification$: of({ notice: { message: 'hello world' } }),
          stats$: of('') } },
        { provide: MarkdownToHtmlPipe, useValue: { transform: () => null } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
