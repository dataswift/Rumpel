/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';

import { TileProfileComponent } from './tile-profile/tile-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivacyToggleHelperComponent } from './privacy-toggle-helper/privacy-toggle-helper.component';

import { ProfilesService } from './profiles.service';

@NgModule({
    imports: [ SharedModule, FormsModule, ReactiveFormsModule, CustomAngularMaterialModule ],
    declarations: [ TileProfileComponent, ProfileComponent, PrivacyToggleHelperComponent ],
    providers: [ ProfilesService ],
    exports: [ TileProfileComponent ]
})
export class ProfilesModule {}
