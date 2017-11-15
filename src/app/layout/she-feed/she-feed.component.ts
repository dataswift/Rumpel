import { Component, OnInit } from '@angular/core';
import { SheFeedService } from '../she-feed.service';
import { Observable } from 'rxjs/Observable';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { SheFeed } from '../she-feed.interface';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rump-she-feed',
  templateUrl: './she-feed.component.html',
  styleUrls: ['./she-feed.component.scss']
})
export class SheFeedComponent implements OnInit {
  public feed$: Observable<HatRecord<SheFeed>[]>;
  public currentPage = 'feed';

  constructor(private sheFeedSvc: SheFeedService) { }

  ngOnInit() {
    this.feed$ = this.sheFeedSvc.data$.do(items => console.log('WHAT', items));

    this.sheFeedSvc.getInitData(1000);
  }

  convertUnixTimestampToMoment(timestamp: number): Moment {
    return moment.unix(timestamp);
  }

}
