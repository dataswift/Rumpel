import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FitbitMyDayComponent } from './fitbit-my-day/fitbit-my-day.component';

import { FitbitActivitySummaryService } from './services/fitbit-activity-summary.service';
import { TileFitbitComponent } from './tile-fitbit/tile-fitbit.component';
import { FitbitProfileService } from './services/fitbit-profile.service';
import { FitbitActivityService } from './services/fitbit-activity.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ FitbitMyDayComponent, TileFitbitComponent ],
  providers: [ FitbitActivitySummaryService, FitbitProfileService, FitbitActivityService ],
  exports: [ FitbitMyDayComponent, TileFitbitComponent ]
})
export class FitbitModule { }
