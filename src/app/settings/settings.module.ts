/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Eleftherios Myteletsis <eleftherios.myteletsis@gmail.com> 2019
 */

import { NgModule } from '@angular/core';
import { SettingsHeaderComponent } from './settings-header/settings-header.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import {SettingsListComponent} from './settings-list/settings-list.component';
import { SharedModule } from '../shared/shared.module';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { SettingsFooterComponent } from './settings-footer/settings-footer.component';

@NgModule({
  imports: [
    SharedModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    SettingsHeaderComponent,
    SettingsPageComponent,
    SettingsListComponent,
    SettingsFooterComponent
  ],
  providers: [],
  exports: [
    SettingsPageComponent,
    SettingsHeaderComponent,
    SettingsListComponent
  ]
})
export class SettingsModule {}
