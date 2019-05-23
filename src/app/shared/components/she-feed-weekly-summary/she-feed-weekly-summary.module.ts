import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAngularMaterialModule } from '../../../core/custom-angular-material.module';
import { SheFeedWeeklySummaryComponent } from './she-feed-weekly-summary/she-feed-weekly-summary.component';
import { SheFeedWeeklySummaryListComponent } from './she-feed-weekly-summary-list/she-feed-weekly-summary-list.component';
import { InsightWeeklySummaryPipe } from '../../pipes';

@NgModule({
  imports: [
    CommonModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    SheFeedWeeklySummaryComponent,
    SheFeedWeeklySummaryListComponent,
    InsightWeeklySummaryPipe
  ],
  exports: [ SheFeedWeeklySummaryComponent ]
})
export class SheFeedWeeklySummaryModule { }
