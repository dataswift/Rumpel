import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { routing } from './mashups.routing';
import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '../shared/shared.module';

import { MixpadComponent } from './mixpad/mixpad.component';
import { TimelineComponent } from './timeline/timeline.component';

import { TimeFilterPipe } from './time-filter.pipe';

@NgModule({
    imports: [ SharedModule, LocationsModule, FormsModule, routing ],
    declarations: [ MixpadComponent, TimelineComponent,
                    TimeFilterPipe ]
})
export class MashupsModule {}
