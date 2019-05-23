import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { HatToolsService } from './hat-tools.service';
import { ToolsListComponent } from './tools-list/tools-list.component';
import { ToolsDetailsComponent } from './tools-details/tools-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    ToolsListComponent,
    ToolsDetailsComponent
  ],
  providers: [ HatToolsService ],
  exports: [  ]
})
export class ToolsModule { }
