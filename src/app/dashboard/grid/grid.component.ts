import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService, SocialService } from '../../services';
import { TileProfileComponent } from '../tile-profile/tile-profile.component';
import { TileGenericComponent } from '../tile-generic/tile-generic.component';
import { TileSocialComponent } from '../tile-social/tile-social.component';
import { TileWeatherComponent } from '../tile-weather/tile-weather.component';
import { TileHeaderComponent } from '../tile-header/tile-header.component';
import { TileDataOffersComponent } from '../tile-data-offers/tile-data-offers.component';
import { TileDataPlugsComponent } from '../tile-data-plugs/tile-data-plugs.component';
import { Event, Post } from '../../shared';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
  directives: [TileProfileComponent, TileGenericComponent, TileSocialComponent, TileWeatherComponent, TileHeaderComponent, TileDataOffersComponent, TileDataPlugsComponent]
})
export class GridComponent implements OnInit, OnDestroy {
  private _eventsSub;
  private _socialSub;
  public events: Array<Event>;
  public socialFeed: Array<Post>;

  constructor(private _eventsSvc: EventsService,
              private _socialSvc: SocialService) {
  }

  ngOnInit() {
    this.events = [];
    this.socialFeed = [];

    this._eventsSub = this._eventsSvc.events$.subscribe(updatedEvents => {
      const now = moment();
      this.events = updatedEvents.filter(event => event.start.isAfter(now));
    });

    this._socialSub = this._socialSvc.socialFeed$.subscribe(posts => {
      this.socialFeed = posts;
    });

    this._eventsSvc.loadAll();
    this._socialSvc.loadAll();
  }

  ngOnDestroy() {
    this._eventsSub.unsubscribe();
    this._socialSub.unsubscribe();
  }

}
