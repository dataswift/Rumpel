import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HatApplicationsService } from './hat-applications.service';
import { HatApplicationListComponent } from './hat-application-list/hat-application-list.component';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { HatApplicationDetailsComponent } from './hat-application-details/hat-application-details.component';
import { HatAppDetailsPermissionsComponent } from './hat-app-details-permissions/hat-app-details-permissions.component';
import { HmiModule } from '../hmi/hmi.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomAngularMaterialModule,
    HmiModule
  ],
  declarations: [
    HatApplicationListComponent,
    HatApplicationDetailsComponent,
    HatAppDetailsPermissionsComponent
  ],
  providers: [ HatApplicationsService ],
  exports: [  ]
})
export class ExploreModule { }
