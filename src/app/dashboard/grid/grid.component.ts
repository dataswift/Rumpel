/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';

declare var $: any;

@Component({
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy, AfterViewInit {
  public showLocationsTile = true;
  public showEventsTile = true;
  public showPostsTile = true;
  public showFitbitTile = false;
  public showMonzoTile = false;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  get appIsNative(): boolean {
    return this.config.native;
  }
}
