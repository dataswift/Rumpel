import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TileProfileComponent } from '../tile-profile/tile-profile.component';
import { TileGenericComponent } from '../tile-generic/tile-generic.component';
import { TileSocialComponent } from '../tile-social/tile-social.component';
import { TileWeatherComponent } from '../tile-weather/tile-weather.component';
import { TileHeaderComponent } from '../tile-header/tile-header.component';
import { TileDataOffersComponent } from '../tile-data-offers/tile-data-offers.component';
import { TileDataPlugsComponent } from '../tile-data-plugs/tile-data-plugs.component';
import { TileMapComponent } from '../tile-map/tile-map.component';
import { TileInfoComponent } from '../tile-info/tile-info.component';
import { TileInfoComponent2 } from '../tile-info2/tile-info.component';
import { TileComingSoonComponent } from '../tile-coming-soon/tile-coming-soon.component';
import { TileDataDebitComponent } from '../tile-data-debit/tile-data-debit.component';
import { Event, Post } from '../../shared';
import { UiStateService } from '../../services';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as moment from 'moment';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
  directives: [TileProfileComponent, TileGenericComponent, TileSocialComponent, TileWeatherComponent, TileHeaderComponent, TileDataOffersComponent, TileDataPlugsComponent, TileMapComponent, TileInfoComponent, TileComingSoonComponent, TileDataDebitComponent, TileInfoComponent2, MODAL_DIRECTIVES]
})
export class GridComponent implements OnInit, OnDestroy {
  public state: any;
  public showTile = { locations: false, events: false, posts: false }
  private sub: any;
  @ViewChild('modal') modal: ModalComponent;
  private link: string;

  constructor(private uiState: UiStateService) {
  }

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this.sub = this.uiState.getState$().subscribe(state => {
      this.state = state;

      if (state.dataTypes.indexOf('locations') > -1) this.showTile.locations = true;
      if (state.dataTypes.indexOf('posts') > -1) this.showTile.posts = true;
      if (state.dataTypes.indexOf('events') > -1) this.showTile.events = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    $('.grid').packery({
      // options
      itemSelector: '.grid-item',
      percentPosition: true
    });
  }

  setModalLink(link: string) {
    this.link = link;
    this.modal.open();
  }

  navigateTo() {
    window.location.href = this.link;
  }
}
