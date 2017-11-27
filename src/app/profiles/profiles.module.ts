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

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PrivacyToggleHelperComponent } from './privacy-toggle-helper/privacy-toggle-helper.component';
import { TileHeroComponent } from '../dashboard/tile-hero/tile-hero.component';

@NgModule({
    imports: [ SharedModule, FormsModule, ProfilesRoutingModule,
               NoopAnimationsModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule,
               MatToolbarModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule,
               MatButtonModule, MatTooltipModule, MatSnackBarModule ],
    declarations: [ TileProfileComponent, ProfileComponent, PrivacyToggleHelperComponent, TileHeroComponent ],
    providers: [ ProfilesService ],
    exports: [ TileProfileComponent, TileHeroComponent ]
})
export class ProfilesModule {}
