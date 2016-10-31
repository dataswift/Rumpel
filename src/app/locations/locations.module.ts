import { NgModule } from '@angular/core';

import { routing } from './locations.routing';
import { SharedModule } from '../shared/shared.module';

import { LocationsComponent } from './locations/locations.component';
import { MapComponent } from './map/map.component';
import { TileMapComponent } from './tile-map/tile-map.component';

import { LocationsService } from './locations.service';

@NgModule({
    imports: [ routing, SharedModule ],
    declarations: [ LocationsComponent, MapComponent, TileMapComponent ],
    providers: [ LocationsService ],
    exports: [ TileMapComponent, MapComponent ]
})
export class LocationsModule {}
