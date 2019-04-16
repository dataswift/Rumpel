/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 3, 2017
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginNativeComponent } from './login-native/login-native.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { LoginStandaloneComponent } from './login-standalone/login-standalone.component';
import { LoginOauthComponent } from './login-oauth/login-oauth.component';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { InfoHeaderComponent } from './info-header/info-header.component';
import { HatSetupLoginComponent } from './hat-setup-login/hat-setup-login.component';
import {HatAppHmiContentComponent} from '../shared/components/hat-app-hmi-content/hat-app-hmi-content.component';
import {HatSetupCacheService} from './hat-setup-login/hat-setup-cache.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    LoginNativeComponent,
    PasswordRecoverComponent,
    PasswordChangeComponent,
    LoginStandaloneComponent,
    LoginOauthComponent,
    HatSetupLoginComponent,
    InfoHeaderComponent],
  providers: [ HatSetupCacheService ],
  exports: [ LoginOauthComponent, LoginNativeComponent, LoginStandaloneComponent, HatSetupLoginComponent ]
})
export class UserModule {}
