/*
 * Copyright (C) 2019 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Terry Lee <terry.lee@hatdex.org> 2, 2019
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { HatClaimConfirmationComponent} from "./hat-claim-confirmation/hat-claim-confirmation.component";
import { HatClaimDetailsComponent } from "./hat-claim-details/hat-claim-details.component";
import { HatClaimNewPasswordComponent } from "./hat-claim-new-password/hat-claim-new-password.component";
import { HatClaimSubscriptionsComponent } from "./hat-claim-subscriptions/hat-claim-subscriptions.component";
import { HatClaimUrlComponent } from "./hat-claim-url/hat-claim-url.component";
import { HatClaimSuccessComponent } from "./hat-claim-success/hat-claim-success.component";

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    HatClaimConfirmationComponent,
    HatClaimDetailsComponent,
    HatClaimNewPasswordComponent,
    HatClaimSubscriptionsComponent,
    HatClaimUrlComponent,
    HatClaimSuccessComponent
  ],
  providers: [  ],
  exports: [
    HatClaimConfirmationComponent,
    HatClaimDetailsComponent,
    HatClaimNewPasswordComponent,
    HatClaimSubscriptionsComponent,
    HatClaimUrlComponent,
    HatClaimSuccessComponent,
  ]
})
export class HatClaimModule {}
