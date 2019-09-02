/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppRootComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessagingService } from './services/global-messaging.service';
import { DialogService } from './core/dialog.service';
import { AuthService } from './core/services/auth.service';
import { APP_CONFIG } from './app.config';
import { WINDOW } from './core/services/global.service';

describe('AppRootComponent', () => {
  let fixture: ComponentFixture<AppRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppRootComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: WINDOW, useValue: {} },
        { provide: GlobalMessagingService, useValue: {} },
        { provide: DialogService, useValue: {} },
        { provide: AuthService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootComponent);
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  xit(`should have as title 'app works!'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  xit('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
