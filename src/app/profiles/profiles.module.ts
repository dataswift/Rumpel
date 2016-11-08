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
