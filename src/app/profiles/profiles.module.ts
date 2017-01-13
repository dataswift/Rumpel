/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TileProfileComponent } from './tile-profile/tile-profile.component';
import { ProfileComponent } from './profile/profile.component';

import { ProfilesService } from './profiles.service';

@NgModule({
    imports: [ SharedModule, FormsModule, ProfilesRoutingModule ],
    declarations: [ TileProfileComponent, ProfileComponent ],
    providers: [ ProfilesService ],
    exports: [ TileProfileComponent ]
})
export class ProfilesModule {}
