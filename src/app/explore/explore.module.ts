import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HatApplicationsService } from './hat-applications.service';
import { HatApplicationListComponent } from './hat-application-list/hat-application-list.component';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { HatApplicationDetailsComponent } from './hat-application-details/hat-application-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    HatApplicationListComponent,
    HatApplicationDetailsComponent
  ],
  providers: [ HatApplicationsService ],
  exports: [  ]
})
export class ExploreModule { }
