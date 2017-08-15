import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FitbitMyDayComponent } from './fitbit-my-day/fitbit-my-day.component';

import { FitbitService } from './fitbit.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [FitbitMyDayComponent],
  providers: [ FitbitService ],
  exports: [FitbitMyDayComponent]
})
export class FitbitModule { }
