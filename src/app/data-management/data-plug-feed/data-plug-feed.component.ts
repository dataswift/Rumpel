import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheFeedService } from '../../she/she-feed.service';
import { Observable } from 'rxjs/Observable';
import { SheFeed } from '../../she/she-feed.interface';

const PROVIDER_ENDPOINT_MAP = {
  spotify: 'spotify/feed',
  calendar: 'calendar/google/events',
  facebook: 'facebook/feed',
  twitter: 'twitter/tweets',
  fitbit: 'fitbit/activity'
};

@Component({
  selector: 'rum-data-plug-feed',
  templateUrl: './data-plug-feed.component.html',
  styleUrls: ['./data-plug-feed.component.scss']
})
export class DataPlugFeedComponent implements OnInit {
  public feed$: Observable<SheFeed[]>;

  constructor(private route: ActivatedRoute,
              private sheSvc: SheFeedService) { }

  ngOnInit() {
    this.feed$ = this.route.parent.params.flatMap(routeParams => {
      return this.sheSvc.getInitData(PROVIDER_ENDPOINT_MAP[routeParams['provider']]);
    });
  }

}
