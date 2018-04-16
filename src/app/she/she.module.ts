/*
 * Copyright (C) 2018 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2018
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SheFeedService } from './she-feed.service';
import { SheFeedComponent } from './she-feed/she-feed.component';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';

@NgModule({
  imports: [ SharedModule, CustomAngularMaterialModule ],
  declarations: [ SheFeedComponent ],
  providers: [ SheFeedService ],
  exports: [  ]
})
export class SheModule {}
