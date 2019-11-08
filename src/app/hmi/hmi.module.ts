import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { HmiBaasContentComponent } from './hmi-baas-content/hmi-baas-content.component';
import { HmiPermissionsListComponent } from './hmi-permissions-list/hmi-permissions-list.component';
import { HmiPermissionsDialogComponent } from './hmi-permissions-dialog/hmi-permissions-dialog.component';
import { HmiRatingComponent } from './hmi-shared-components/hmi-rating/hmi-rating.component';
import { HmiDataDebitComponent } from './hmi-shared-components/hmi-data-debit/hmi-data-debit.component';
import { HmiDataPlugComponent } from './hmi-shared-components/hmi-data-plug/hmi-data-plug.component';
import { HmiDaasContentComponent } from './hmi-daas-content/hmi-daas-content.component';

@NgModule({
  imports: [
    SharedModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    HmiBaasContentComponent,
    HmiPermissionsListComponent,
    HmiPermissionsDialogComponent,
    HmiRatingComponent,
    HmiDataDebitComponent,
    HmiDataPlugComponent,
    HmiDaasContentComponent,
  ],
  providers: [ ],
  exports: [
    HmiBaasContentComponent,
    HmiPermissionsListComponent,
    HmiPermissionsDialogComponent,
    HmiRatingComponent,
    HmiDataDebitComponent,
    HmiDataPlugComponent,
    HmiDaasContentComponent,
  ]
})
export class HmiModule {}
