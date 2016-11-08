import { NgModule } from '@angular/core';

import { LocationsRoutingModule } from './locations-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LocationsComponent } from './locations/locations.component';
import { MapComponent } from './map/map.component';
import { TileMapComponent } from './tile-map/tile-map.component';

import { LocationsService } from './locations.service';

@NgModule({
    imports: [ SharedModule, LocationsRoutingModule ],
    declarations: [ LocationsComponent, MapComponent, TileMapComponent ],
    providers: [ LocationsService ],
    exports: [ TileMapComponent, MapComponent ]
})
export class LocationsModule {}
