import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MashupsRoutingModule } from './mashups-routing.module';
import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '../shared/shared.module';

import { MixpadComponent } from './mixpad/mixpad.component';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { SocialModule } from '../social/social.module';

@NgModule({
  imports: [ SharedModule, LocationsModule, FormsModule, SocialModule, MashupsRoutingModule ],
  declarations: [
    MixpadComponent,
    ActivityListComponent]
})

export class MashupsModule {
}
