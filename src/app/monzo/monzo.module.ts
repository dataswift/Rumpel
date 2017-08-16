import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MonzoMyDayComponent } from './monzo-my-day/monzo-my-day.component';

import { MonzoService } from './monzo.service';
import { TileMonzoComponent } from './tile-monzo/tile-monzo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MonzoMyDayComponent, TileMonzoComponent],
  providers: [ MonzoService ],
  exports: [ MonzoMyDayComponent, TileMonzoComponent ]
})
export class MonzoModule { }
