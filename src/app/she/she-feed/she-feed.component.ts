import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { SheFeedService } from '../she-feed.service';
import { Observable } from 'rxjs/Observable';
import { SheFeed } from '../she-feed.interface';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Filter } from '../../shared/interfaces/bundle.interface';
import { MatRadioChange } from '@angular/material/radio';

import * as format from 'date-fns/format';

@Component({
  selector: 'rum-she-feed',
  templateUrl: './she-feed.component.html',
  styleUrls: ['./she-feed.component.scss']
})
export class SheFeedComponent implements OnInit, AfterViewInit {
  @ViewChild('feedContainer') feedContainer: ElementRef;
  @ViewChildren('daySeparator', { read: ElementRef }) dateSeparators: QueryList<ElementRef>;
  public feed$: Observable<{ day: string; data: SheFeed[]; }[] >;

  constructor(private sheFeedSvc: SheFeedService) { }

  ngOnInit() {
    this.feed$ = this.sheFeedSvc.getInitFeed();
  }

  ngAfterViewInit() {
    const today = format(new Date(), 'ddd DD MMM YYYY');

    this.dateSeparators.changes.subscribe((changes) => {
      const todayElement = changes.find(item => {
        return item.nativeElement.textContent === today;
      });

      // TODO: Fix this hack. Material mat-sidenav component does not currently support programmatic scrolling
      // See https://github.com/angular/material2/issues/4280
      document.querySelector('.mat-sidenav-content').scrollTop = todayElement.nativeElement.offsetTop;
    });
  }

  convertUnixTimestampToMoment(timestamp: number): Moment {
    return moment.unix(timestamp);
  }

  applyFilter(change: MatRadioChange) {
    // if (change.value === 'all') {
    //   this.sheFeedSvc.clearData();
    //   this.sheFeedSvc.getInitData(1000);
    // } else {
    //   this.sheFeedSvc.getTimeIntervalData(this.generateTimeFilter(change.value));
    // }
  }

  private generateTimeFilter(filter: string): Filter[] {
    let startTime: number;
    let endTime: number;

    if (filter === 'past') {
      startTime = 1;
      endTime = moment().unix();
    } else {
      startTime = moment().unix();
      endTime = moment().add(5, 'years').unix();
    }

    return [{
      field: 'date.unix',
      operator: {
        operator: 'between',
        lower: startTime,
        upper: endTime
      }
    }];
  }

}
