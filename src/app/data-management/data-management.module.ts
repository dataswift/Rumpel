import { NgModule } from '@angular/core';

import { DataPlugsComponent } from './data-plugs/data-plugs.component';
import { TileDataPlugsComponent } from './tile-data-plugs/tile-data-plugs.component';

import { DataPlugService } from './data-plug.service';
import { DataPlugDataComponent } from './data-plug-data/data-plug-data.component';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { LocationsModule } from '../locations/locations.module';
import { DataPlugFeedComponent } from './data-plug-feed/data-plug-feed.component';
import { CustomAngularMaterialModule } from '../core/custom-angular-material.module';
import { DataPlugStaticComponent } from './data-plug-static/data-plug-static.component';
import { DataDebitListComponent } from './data-debit-list/data-debit-list.component';

@NgModule({
  imports: [
    SharedModule,
    LocationsModule,
    CoreModule,
    CustomAngularMaterialModule
  ],
  declarations: [
    DataPlugsComponent,
    TileDataPlugsComponent,
    DataPlugDataComponent,
    DataPlugFeedComponent,
    DataPlugStaticComponent,
    DataDebitListComponent
  ],
  providers: [ DataPlugService ],
  exports: [ TileDataPlugsComponent, DataPlugDataComponent ]
})
export class DataManagementModule { }
