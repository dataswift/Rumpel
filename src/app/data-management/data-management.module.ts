import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataPlugsComponent } from './data-plugs/data-plugs.component';
import { TileDataPlugsComponent } from './tile-data-plugs/tile-data-plugs.component';

import { DataPlugService } from './data-plug.service';
import { DataPlugDataComponent } from './data-plug-data/data-plug-data.component';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { LocationsModule } from '../locations/locations.module';
import { FacebookViewComponent } from './facebook-view/facebook-view.component';
import { TwitterViewComponent } from './twitter-view/twitter-view.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { NotablesViewComponent } from './notables-view/notables-view.component';
import { LocationsViewComponent } from './locations-view/locations-view.component';
import { PhotosViewComponent } from './photos-view/photos-view.component';
import { FacebookEventViewComponent } from './facebook-event-view/facebook-event-view.component';

@NgModule({
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    SharedModule,
    LocationsModule,
    LayoutModule
  ],
  declarations: [
    DataPlugsComponent,
    TileDataPlugsComponent,
    DataPlugDataComponent,
    FacebookViewComponent,
    TwitterViewComponent,
    CalendarViewComponent,
    NotablesViewComponent,
    LocationsViewComponent,
    PhotosViewComponent,
    FacebookEventViewComponent
  ],
  providers: [ DataPlugService ],
  exports: [ TileDataPlugsComponent, DataPlugDataComponent ]
})
export class DataManagementModule { }
