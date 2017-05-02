/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user/user-routing.module';

import { GridComponent } from './dashboard';
import { OffersComponent } from './offers/offers.component';
import { AboutComponent } from './layout/about/about.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'public/profile', pathMatch: 'full' },
      { path: 'offers', component: OffersComponent },
      { path: 'users/authenticate', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: GridComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutComponent },
      ...userRoutes
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
