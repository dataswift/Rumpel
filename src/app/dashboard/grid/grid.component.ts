import { Component, OnInit } from '@angular/core';
import { TileProfileComponent } from '../tile-profile/tile-profile.component';
import { TileGenericComponent } from '../tile-generic/tile-generic.component';
import { TileSocialComponent } from '../tile-social/tile-social.component';
import { TileWeatherComponent } from '../tile-weather/tile-weather.component';
import { TileHeaderComponent } from '../tile-header/tile-header.component';
import { TileDataOffersComponent } from '../tile-data-offers/tile-data-offers.component';
import { TileDataPlugsComponent } from '../tile-data-plugs/tile-data-plugs.component';
import { TileMapComponent } from '../tile-map/tile-map.component';
import { Event, Post } from '../../shared';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
  directives: [TileProfileComponent, TileGenericComponent, TileSocialComponent, TileWeatherComponent, TileHeaderComponent, TileDataOffersComponent, TileDataPlugsComponent, TileMapComponent]
})
export class GridComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
