import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { LocationsModule } from '../locations/locations.module';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { DataDebitListComponent } from './data-debit-list/data-debit-list.component';
import { DataDebitDetailsComponent } from './data-debit-details/data-debit-details.component';

@NgModule({
  imports: [
    SharedModule,
    LocationsModule,
    CoreModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    DataDebitListComponent,
    DataDebitDetailsComponent
  ]
})
export class DataManagementModule { }
