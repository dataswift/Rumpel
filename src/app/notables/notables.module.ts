/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
// import { NotablesViewComponent } from './notables-view/notables-view.component';
import { NotablesService } from './notables.service';

@NgModule({
  imports: [ SharedModule, FormsModule ],
  declarations: [],
  providers: [ NotablesService ]
  // exports: [ TileNotablesComponent ]
})
export class NotablesModule {}
