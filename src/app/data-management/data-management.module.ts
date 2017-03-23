import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataPlugsComponent } from './data-plugs/data-plugs.component';
import { TileDataPlugsComponent } from "./tile-data-plugs/tile-data-plugs.component";

import { DataPlugService } from "./data-plug.service";

@NgModule({
  imports: [
    CommonModule,
    DataManagementRoutingModule
  ],
  declarations: [
    DataPlugsComponent,
    TileDataPlugsComponent
  ],
  providers: [ DataPlugService ],
  exports: [ TileDataPlugsComponent ]
})
export class DataManagementModule { }
