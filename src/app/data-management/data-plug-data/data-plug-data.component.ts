import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';
import { DataPlugService } from '../data-plug.service';
import { EventsService } from '../../dimensions/events.service';
import { LocationsService } from '../../locations/locations.service';
import { SocialService } from '../../social/social.service';
import { TwitterService } from '../../social/twitter.service';
import { PhotosService } from '../../photos/photos.service';
import { NotablesService } from '../../notables/notables.service';
import { FacebookEventsService } from '../../dimensions/facebook-events.service';
import { GoogleEventsService } from '../../dimensions/google-events.service';
import { FitbitService } from '../../fitbit/fitbit.service';
import { Post, Tweet, Event, Photo, Location } from '../../shared/interfaces/index';
import { Fitbit } from '../../fitbit/fitbit.interface';
import { Notable } from '../../shared/interfaces/notable.class';
import * as moment from 'moment';
import { Moment } from 'moment';

declare var $: any;

@Component({
  selector: 'rump-data-plug-data',
  templateUrl: './data-plug-data.component.html',
  styleUrls: ['./data-plug-data.component.scss']
})
export class DataPlugDataComponent implements OnInit, OnDestroy {

  private currentPage = 'static';
  private routerSub: any;
  private dataplugs: Observable<Array<any>>;
  private plugName = '';
  private plugMeta: any;

  private feedPostSub: Subscription;
  private feedEventSub: Subscription;

  public feed: Array<any> = [];
  public filteredFeed: Array<any> = [];
  public events: Array<any> = [];
  public locations: Array<Location> = [];

  public fromDate: Moment;
  public toDate: Moment = moment();

  public tabView = 'posts';

  public totalLocationDPs = 0;


  constructor(private route: ActivatedRoute,
              private dataplugsSvc: DataPlugService,
              private eventsSvc: EventsService,
              private googleEventsSvc: GoogleEventsService,
              private facebookEventsSvc: FacebookEventsService,
              private socialSvc: SocialService,
              private twitterSvc: TwitterService,
              private photoSvc: PhotosService,
              private notablesSvc: NotablesService,
              private fitbitSvc: FitbitService,
              private locationsSvc: LocationsService) { }

  ngOnInit() {

    this.dataplugs = this.dataplugsSvc.dataplugs$;

    this.routerSub = this.route.params.subscribe(params => {
       this.plugName = params['id'];

       this.dataplugs.forEach ( plugs => {
         plugs.forEach(plug => {
           if (plug.name === this.plugName) {
             this.plugMeta = plug;

             switch ( plug.name.toLowerCase() ) {
               case 'facebook':
                  this.initFacebook();
                  break;
               case 'twitter':
                  this.initTwitter();
                  break;
               case 'dropbox photos':
                  this.initDropbox();
                  break;
               case 'calendar':
                  this.initCalendar();
                  break;
               case 'rumpel':
                  this.initRumpel();
                  break;
               case 'location':
                  this.tabView = 'locations';
                  this.initLocations();
                  break;
             }
           }
         });
       });
    });
  }



  initFacebook() {
    this.feedPostSub = this.socialSvc.data$.subscribe((posts: Array<Post>) => {
      this.feed = posts;
      this.sortFeed('createdTime');
    });

    this.feedEventSub = this.facebookEventsSvc.data$.subscribe((posts: Array<Event>) => {
      this.events = posts;
      this.sortEvents('start');
    });
  }


  initTwitter() {
    this.feedPostSub = this.twitterSvc.data$.subscribe((posts: Array<Tweet>) => {
      this.feed = posts;
      this.sortFeed('createdTime');
    });
  }


  initDropbox() {
    this.feedPostSub = this.photoSvc.photos$.subscribe((posts: Array<Photo>) => {
      this.feed = posts;
      this.sortFeed('timestamp');
    });
  }

  initLocations() {
    this.feedPostSub = this.locationsSvc.data$.subscribe((posts: Array<Location>) => {
      this.feed = posts;
      this.locations = posts;
      this.tabView = 'locations';
      this.sortFeed('timestamp');
    });
  }

  initCalendar() {
    this.feedEventSub = this.googleEventsSvc.data$.subscribe((posts: Array<Event>) => {
      this.events = posts;
      this.tabView = 'events';
      this.sortEvents('start');
    });
  }


  initRumpel() {
    this.feedPostSub = this.notablesSvc.data$.subscribe((posts: Array<Notable>) => {
      this.feed = posts;
      this.sortFeed('timestamp');
    });

    this.feedEventSub = this.eventsSvc.data$.subscribe((posts: Array<Event>) => {
      this.events = posts;
      this.sortEvents('start');
    });
  }


  setFromDate(event: any) {
    if (event.target.value === '') {
      this.fromDate = moment('1970-01-01');
    } else {
      this.fromDate = moment(event.target.value);
    }
    // this.filterAndSortFeed();
  }

  setToDate(event: any) {
    if (event.target.value === '') {
      this.toDate = moment();
    } else {
      this.toDate = moment(event.target.value);
    }
    // this.filterAndSortFeed();
  }


  sortFeed(sortBy: string) {

    /*

    // filter by selected dates
    let fromDate = this.fromDate;
    let toDate = this.toDate;

    if ( !moment.isMoment(fromDate) ) {
      fromDate = moment('1970-01-01');
    }

    if ( !moment.isMoment(toDate) ) {
      toDate = moment();
    }

    */

    /*

    this.filteredFeed = this.feed.filter( item => {
        return ( item.createdDate.isBefore(toDate) && item.createdDate.isAfter(fromDate)  );
    });

    */

    // sort array by date - most recent first
    this.filteredFeed = this.feed.sort( (a, b) => {
        const momentA = moment(a[sortBy]);
        const momentB = moment(b[sortBy]);
        const result = momentA.isBefore(momentB) ? 1 : -1;
        return result;
    });
  }

  sortEvents(sortBy: string) {
    this.events = this.events.sort( (a, b) => {
        const momentA = moment(a[sortBy]);
        const momentB = moment(b[sortBy]);
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
