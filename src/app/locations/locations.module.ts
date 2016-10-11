import { NgModule } from '@angular/core';

import { routing } from './locations.routing';

import { LocationsComponent } from './locations/locations.component';
import { MapComponent } from './map/map.component';
import { TileMapComponent } from './tile-map/tile-map.component';

import { LocationsService } from './locations.service';

@NgModule({
    imports: [ routing ],
    declarations: [ LocationsComponent, MapComponent, TileMapComponent ],
    providers: [ LocationsService ],
    exports: [ TileMapComponent, MapComponent ]
})
export class LocationsModule {}
