/*
 * Copyright (C) 2017 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 3, 2017
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { LoginStandaloneComponent } from './login-standalone/login-standalone.component';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { InfoHeaderComponent } from './info-header/info-header.component';
import { HmiModule } from '../hmi/hmi.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CustomAngularMaterialModule,
    HmiModule
  ],
  declarations: [
    PasswordChangeComponent,
    LoginStandaloneComponent,
    InfoHeaderComponent],
  exports: [ LoginStandaloneComponent ]
})
export class UserModule {}
