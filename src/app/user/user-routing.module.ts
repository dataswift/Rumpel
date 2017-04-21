/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginHatComponent } from './login-hat/login-hat.component';
import { LoginStandaloneComponent } from './login-standalone/login-standalone.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AuthGuard } from '../auth.guard';
import { NativeGuard } from '../native-guard.service';

export const userRoutes: Routes = [
  { path: 'user/login', component: LoginComponent, canActivate: [NativeGuard] },
  { path: 'user/login/start', component: LoginStandaloneComponent },
  { path: 'hatlogin', component: LoginHatComponent, canActivate: [NativeGuard, AuthGuard] },
  { path: 'user/password/recover', component: PasswordRecoverComponent, canActivate: [NativeGuard] },
  { path: 'user/password/change', component: PasswordChangeComponent, canActivate: [AuthGuard] },
  { path: 'user/password/change/:resetToken', component: PasswordChangeComponent, canActivate: [NativeGuard] }
];
