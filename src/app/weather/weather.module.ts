import { NgModule } from '@angular/core';

// import { routing } from './weather.routing';

import { TileWeatherComponent } from './tile-weather/tile-weather.component';

import { WeatherService } from './weather.service';

@NgModule({
    declarations: [ TileWeatherComponent ],
    providers: [ WeatherService ],
    exports: [ TileWeatherComponent ]
})
export class WeatherModule {}
