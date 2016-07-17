import { Component, OnInit, OnDestroy } from '@angular/core';
import { TileProfileComponent } from '../tile-profile/tile-profile.component';
import { TileGenericComponent } from '../tile-generic/tile-generic.component';
import { TileSocialComponent } from '../tile-social/tile-social.component';
import { TileWeatherComponent } from '../tile-weather/tile-weather.component';
import { TileHeaderComponent } from '../tile-header/tile-header.component';
import { TileDataOffersComponent } from '../tile-data-offers/tile-data-offers.component';
import { TileDataPlugsComponent } from '../tile-data-plugs/tile-data-plugs.component';
import { TileMapComponent } from '../tile-map/tile-map.component';
import { TileInfoComponent } from '../tile-info/tile-info.component';
import { Event, Post } from '../../shared';
import { UiStateService } from '../../services';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
  directives: [TileProfileComponent, TileGenericComponent, TileSocialComponent, TileWeatherComponent, TileHeaderComponent, TileDataOffersComponent, TileDataPlugsComponent, TileMapComponent, TileInfoComponent]
})
export class GridComponent implements OnInit, OnDestroy {
  public state: any;
  private sub: any;

  constructor(private uiState: UiStateService) {
  }

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this.sub = this.uiState.getState$().subscribe(state => {
      this.state = state;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
