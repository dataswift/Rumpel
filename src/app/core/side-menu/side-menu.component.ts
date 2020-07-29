/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HatApplicationsService } from '../../explore/hat-applications.service';
import { Subscription } from 'rxjs';

import { APP_CONFIG, AppConfig } from '../../app.config';
import { HatApplication } from '../../explore/hat-application.interface';

@Component({
  selector: 'rum-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  private windowRef: any;
  private locationOrigin = '';

  // hack: uiState service needs to be injected before Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  ngOnInit() {
    this.locationOrigin = window.location.origin;
  }

  get mainMenu(): Array<any> {
    return this.config.mainMenu;
  }
}
