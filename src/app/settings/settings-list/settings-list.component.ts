/*
 * Copyright (C) 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Eleftherios Myteletsis <eleftherios.myteletsis@dataswift.io> 3, 2019
 */


import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'rum-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  public version: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
    this.version = this.config.version
  }
  get settingsMenu(): Array<any> {
    return this.config.settingsMenu;
  }

  get settingsPrivateDataMenu(): Array<any> {
    return this.config.settingsPrivateDataMenu;
  }

}
