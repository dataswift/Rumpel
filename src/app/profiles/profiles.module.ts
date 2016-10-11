import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './profiles.routing';
import { SharedModule } from '../shared/shared.module';

import { TileProfileComponent } from './tile-profile/tile-profile.component';
import { ProfileComponent } from './profile/profile.component';

import { ProfilesService } from './profiles.service';

@NgModule({
    imports: [ SharedModule, FormsModule, routing ],
    declarations: [ TileProfileComponent, ProfileComponent ],
    providers: [ ProfilesService ],
    exports: [ TileProfileComponent ]
})
export class ProfilesModule {}
