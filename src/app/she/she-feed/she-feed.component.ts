import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { SheFeedService } from '../she-feed.service';
import { Observable } from 'rxjs';
import { SheFeed } from '../she-feed.interface';
import * as moment from 'moment';
import { take } from 'rxjs/operators';

import * as format from 'date-fns/format';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'rum-she-feed',
  templateUrl: './she-feed.component.html',
  styleUrls: ['./she-feed.component.scss']
})
export class SheFeedComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('feedContainer') feedContainer: ElementRef;
  @ViewChildren('daySeparator', { read: ElementRef }) dateSeparators: QueryList<ElementRef>;
  @ViewChild(DaterangepickerDirective) pickerDirective: DaterangepickerDirective;

  public feed$: Observable<{ day: string; data: SheFeed[]; }[] >;
  private todayElement: any;
  private filteredData = false;
  private scrolled = false;

  private selected: {startDate: moment.Moment, endDate: moment.Moment};
  private hideDatePicker = true;

  constructor(private sheFeedSvc: SheFeedService) {
    this.selected = {
      startDate: moment('2015-11-18T00:00Z'),
      endDate: moment('2015-11-26T00:00Z')
    }
  }

  ngOnInit() {
    this.feed$ = this.sheFeedSvc.getInitFeed();
    this.scrolled = false;
  }

  ngOnDestroy(): void {
    this.scrolled = false;
  }

  ngAfterViewChecked() {
    this.findTodayElement();
  }

  findTodayElement() {
    if (this.dateSeparators && !this.scrolled) {
      const today = format(new Date(), 'ddd DD MMM YYYY');

      this.dateSeparators.changes.pipe(take(1)).subscribe((changes) => {
        this.todayElement = changes.find(item => {
          return item.nativeElement.textContent === today;
        });

        // TODO: Fix this hack. Material mat-sidenav component does not currently support programmatic scrolling
        // See https://github.com/angular/material2/issues/4280
        if (this.todayElement && !this.scrolled) {
          this.scrolled = true;

          document.querySelector('.mat-sidenav-content').scrollTop = this.todayElement.nativeElement.offsetTop;
        }
      });
    }
  }

  refreshFeedData() {
    this.filteredData = false;
    this.scrolled = false;
    this.feed$ = this.sheFeedSvc.getInitFeed();
  }

  scrollToToday() {
    if (this.todayElement) {
      document.querySelector('.mat-sidenav-content').scrollTop = this.todayElement.nativeElement.offsetTop;
    }
  }

  loadMoreData() {
    this.sheFeedSvc.getMoreData();
  }

  change(e) {
    console.log(e)
  }
  choosedDate(e) {
    this.hideDatePicker = true;
    this.filteredData = true;

    const startDay = e.startDate.startOf('day').unix();
    const endDay = e.endDate.endOf('day').unix();

    this.feed$ = null;
    this.feed$ = this.sheFeedSvc.getFeedDataByTime(startDay, endDay);
    this.todayElement = null;
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }
  open(e) {
    this.hideDatePicker = !this.hideDatePicker;
  }
}
