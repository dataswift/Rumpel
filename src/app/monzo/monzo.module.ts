import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MonzoMyDayComponent } from './monzo-my-day/monzo-my-day.component';

import { MonzoService } from './monzo.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MonzoMyDayComponent],
  providers: [ MonzoService ],
  exports: [ MonzoMyDayComponent ]
})
export class MonzoModule { }
