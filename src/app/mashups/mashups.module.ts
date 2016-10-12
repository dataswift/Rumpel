import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './mashups.routing';
import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '../shared/shared.module';

import { DataPointComponent } from './data-point/data-point.component';
import { MixpadComponent } from './mixpad/mixpad.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ViewByDayComponent } from './view-by-day/view-by-day.component';

import { LocationFilterPipe } from './location-filter.pipe';
import { TimeFilterPipe } from './time-filter.pipe';

@NgModule({
    imports: [ SharedModule, LocationsModule, FormsModule, routing ],
    declarations: [ MixpadComponent, DataPointComponent, TimelineComponent, ViewByDayComponent,
                    LocationFilterPipe, TimeFilterPipe ]
})
export class MashupsModule {}
