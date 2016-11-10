import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MashupsRoutingModule } from './mashups-routing.module';
import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '../shared/shared.module';
import { SocialModule } from '../social/social.module';

import { MyDayComponent } from './my-day/my-day.component';
import { MashupsComponent } from './mashups/mashups.component';
import { ActivityListComponent } from './activity-list/activity-list.component';

@NgModule({
  imports: [ SharedModule, LocationsModule, FormsModule, SocialModule, MashupsRoutingModule ],
  declarations: [
    MyDayComponent,
    ActivityListComponent,
    MashupsComponent
  ]
})
export class MashupsModule {}
