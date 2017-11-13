import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';
import { DataPlugService } from '../data-plug.service';
import { LocationsService } from '../../locations/locations.service';
import { SocialService } from '../../social/social.service';
import { TwitterService } from '../../social/twitter.service';
import { NotablesService } from '../../notables/notables.service';
import { FacebookEventsService } from '../../dimensions/facebook-events.service';
import { GoogleEventsService } from '../../dimensions/google-events.service';
import { FitbitService } from '../../fitbit/fitbit.service';
import { Post, Tweet, Event, Location } from '../../shared/interfaces/index';
import { FitbitActivitySummary } from '../../fitbit/fitbit.interface';
import { Notable } from '../../shared/interfaces/notable.class';
import * as moment from 'moment';
import { Moment } from 'moment';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';
import {DataPlug} from '../../shared/interfaces/data-plug.interface';

declare var $: any;

@Component({
  selector: 'rump-data-plug-data',
  templateUrl: './data-plug-data.component.html',
  styleUrls: ['./data-plug-data.component.scss']
})
export class DataPlugDataComponent implements OnInit, OnDestroy {

  public currentPage = 'feed';
  public routerSub: any;
  public dataplugs: Observable<DataPlug[]>;
  public plugName = '';
  public plugMeta: any;

  public feedPostSub: Subscription;
  public feedEventSub: Subscription;
  public feedSource: any;
  public eventSource: any;
  public feedTimeField = 'timestamp';
  public eventsTimeField = 'start';

  public feed: Array<any> = [];
  public events: Array<any> = [];
  public locations: HatRecord<Location>[] = [];
  public fromDate: Moment;
  public toDate: Moment = moment();
  public tabView = 'posts';
  public totalLocationDPs = 0;
  public staticData: Array<any> = [];


  constructor(private route: ActivatedRoute,
              private dataplugsSvc: DataPlugService,
              private googleEventsSvc: GoogleEventsService,
              private facebookEventsSvc: FacebookEventsService,
              private socialSvc: SocialService,
              private twitterSvc: TwitterService,
              private notablesSvc: NotablesService,
              private fitbitSvc: FitbitService,
              private locationsSvc: LocationsService) { }

  ngOnInit() {

    this.dataplugs = this.dataplugsSvc.dataplugs$;

    this.routerSub = this.route.params.subscribe(params => {
       this.plugName = params['id'];

       this.dataplugs.subscribe(plugs => {
         plugs.forEach(plug => {
           if (plug.name.toLowerCase() === this.plugName) {
             this.plugMeta = plug;

             switch ( plug.name.toLowerCase() ) {
               case 'facebook':
                  this.feedSource = this.socialSvc;
                  this.eventSource = this.facebookEventsSvc;
                  this.initFacebook();
                  break;
               case 'twitter':
                  this.feedSource = this.twitterSvc;
                  this.initTwitter();
                  break;
               case 'calendar':
                  this.eventSource = this.googleEventsSvc;
                  this.initCalendar();
                  break;
               case 'rumpel':
                  this.feedSource = this.notablesSvc;
                  this.initRumpel();
                  break;
               case 'locations':
                  this.tabView = 'locations';
                  this.feedSource = this.locationsSvc;
                  this.initLocations();
                  break;
             }
           }
         });
       });
    });
  }

  initFacebook() {
    this.feedPostSub = this.socialSvc.data$.subscribe((posts: HatRecord<Post>[]) => {
      this.feed = posts;
      this.feedTimeField = 'createdTime';
      this.sortFeed();
    });

    this.feedEventSub = this.facebookEventsSvc.data$.subscribe((posts: HatRecord<Event>[]) => {
      this.events = posts;
      this.eventsTimeField = 'start';
      this.sortEvents();
    });

    this.facebookEventsSvc.getInitData();
    this.socialSvc.getInitData();
  }

  initTwitter() {
    this.feedPostSub = this.twitterSvc.data$.subscribe((posts: HatRecord<Tweet>[]) => {
      // set static data
      if (posts.length > 0) {
        this.staticData = [];
        const keys = Object.keys(posts[0].data.user);
        keys.forEach(key => {
          this.staticData.push({name: key, value: posts[0].data.user[key]});
        });
      }

      // set feed data
      this.feed = posts;

      // sort feed by date
      this.feedTimeField = 'createdTime';
      this.sortFeed();
    });

    this.twitterSvc.getInitData();
  }

  initLocations() {
    this.feedPostSub = this.locationsSvc.data$.subscribe((posts: HatRecord<Location>[]) => {
      this.feed = posts;
      this.locations = posts;
      this.tabView = 'locations';
      this.feedTimeField = 'timestamp';
      this.sortFeed();
      this.resizeWindow();
    });

    this.locationsSvc.getInitData();
  }

  initCalendar() {
    this.feedEventSub = this.googleEventsSvc.data$.subscribe((posts: HatRecord<Event>[]) => {
      this.events = posts;
      this.tabView = 'events';
      this.eventsTimeField = 'start';
      this.sortEvents();
    });

    this.googleEventsSvc.getInitData();
  }

  initRumpel() {
    this.feedPostSub = this.notablesSvc.data$.subscribe((posts: HatRecord<Notable>[]) => {
      this.feed = posts;
      this.feedTimeField = 'timestamp';
      this.sortFeed();
    });

    this.notablesSvc.getInitData();
  }

  setFromDate(event: any) {
    if (event.target.value === '') {
      this.fromDate = moment('1970-01-01');
    } else {
      this.fromDate = moment(event.target.value);
    }
    this.filterByDate()
  }

  setToDate(event: any) {
    if (event.target.value === '') {
      this.toDate = moment();
    } else {
      this.toDate = moment(event.target.value);
    }
    this.filterByDate();
  }


  loadMoreFeedData() {
    this.feedSource.getMoreData();
  }

  loadMoreEventData() {
    this.eventSource.getMoreData();
  }

  filterByDate() {
    let fromDate = this.fromDate;
    let toDate = this.toDate;

    if ( !moment.isMoment(fromDate) ) {
      fromDate = moment('1970-01-01');
    }

    if ( !moment.isMoment(toDate) ) {
      toDate = moment();
    }

    const feedFormat = 'X';
    if (this.feedSource) {
      this.feedSource.clearData();
      this.feedSource.getTimeIntervalData(fromDate.startOf('day').format(feedFormat), toDate.endOf('day').format(feedFormat));
    }

    const eventFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    if (this.eventSource) {
      this.eventSource.clearData();
      this.eventSource.getTimeIntervalData(fromDate.startOf('day').format(eventFormat), toDate.endOf('day').format(eventFormat));
    }

    this.resizeWindow();
  }


  sortFeed() {
    // sort array by date - most recent first
    this.feed = this.feed.sort( (a, b) => {
        const momentA = moment(a[this.feedTimeField]);
        const momentB = moment(b[this.feedTimeField]);
        const result = momentA.isBefore(momentB) ? 1 : -1;

        return result;
    });
  }

  sortEvents() {
    this.events = this.events.sort( (a, b) => {
        const momentA = moment(a[this.feedTimeField]);
        const momentB = moment(b[this.feedTimeField]);
        const result = momentA.isBefore(momentB) ? 1 : -1;

        return result;
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();

    if (this.feedPostSub) {
      this.feedPostSub.unsubscribe();
    }

    if (this.feedEventSub) {
      this.feedEventSub.unsubscribe();
    }
  }

  resizeWindow() {
     // this is used to make the sure the map initialises properly
     const evt = document.createEvent('HTMLEvents');
     evt.initEvent('resize', true, false);
     window.dispatchEvent(evt);
  }

}
