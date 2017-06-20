/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { OffersComponent } from './offers-component/offers.component';
import { OffersAcceptedComponent } from './offers-accepted/offers-accepted.component';

@NgModule({
    imports: [
      RouterModule.forChild([
        { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
        { path: 'offers-accepted', component: OffersAcceptedComponent, canActivate: [AuthGuard] }
      ])
    ],
    exports: [
      RouterModule
    ]
})
export class OffersRoutingModule {}
