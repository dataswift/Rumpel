import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FitbitMyDayComponent } from './fitbit-my-day/fitbit-my-day.component';

import { FitbitActivitySummaryService } from './services/fitbit-activity-summary.service';
import { TileFitbitComponent } from './tile-fitbit/tile-fitbit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ FitbitMyDayComponent, TileFitbitComponent ],
  providers: [ FitbitActivitySummaryService ],
  exports: [ FitbitMyDayComponent, TileFitbitComponent ]
})
export class FitbitModule { }
