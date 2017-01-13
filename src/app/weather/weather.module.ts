/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

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
