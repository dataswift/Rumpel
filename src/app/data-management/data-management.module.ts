import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataPlugsComponent } from './data-plugs/data-plugs.component';
import { TileDataPlugsComponent } from './tile-data-plugs/tile-data-plugs.component';

import { DataPlugService } from './data-plug.service';
import { DataPlugDataComponent } from './data-plug-data/data-plug-data.component';

@NgModule({
  imports: [
    CommonModule,
    DataManagementRoutingModule
  ],
  declarations: [
    DataPlugsComponent,
    TileDataPlugsComponent,
    DataPlugDataComponent
  ],
  providers: [ DataPlugService ],
  exports: [ TileDataPlugsComponent, DataPlugDataComponent ]
})
export class DataManagementModule { }
