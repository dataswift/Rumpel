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


  constructor(private route: ActivatedRoute,
              private dataplugsSvc: DataPlugService,
              private eventsSvc: EventsService,
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
           if(plug.name === this.plugName){
             this.plugMeta = plug;

             switch ( plug.name.toLowerCase() ) {
               case "facebook":
                  this.initFacebook();
                  break;
               case "twitter":
                  this.initTwitter();
                  break;
               case "dropbox photos":
                  this.initDropbox();
                  break;
               case "location":
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
      this.filteredFeed = posts;
      /*
      posts.forEach(post => {
        const item = {
          body: post.content,
          heading: post.story,
          createdDate: post.createdTime,
          updatedDate: post.updatedTime,
          meta: [
            {name: "Status type", value: post.statusType },
            {name: "Type", value: post.type },
            {name: "Author", value: post.from },
            {name: "Application", value: post.application },
            {name: "Privacy", value: post.privacy.description + ", " + post.privacy.value },
            {name: "ID", value: post.id }
          ]
        };
        this.feed.push(item);
      });
      */

      this.filterAndSortFeed();
    });
  }


  initTwitter() {
    this.feedPostSub = this.twitterSvc.data$.subscribe((posts: Array<Tweet>) => {
      this.feed = [];
      this.filteredFeed = [];
      posts.forEach(post => {
        const item = {
          body: {message: post.text},
          createdDate: post.createdTime,
          meta: [
            {name: "Type", value: post.type },
            {name: "Favorite count", value: post.favorite_count },
            {name: "Retweet count", value: post.retweet_count },
            {name: "User", value: post.user.screen_name },
            {name: "ID", value: post.id }
          ]
        };
        this.feed.push(item);
      });

      this.filterAndSortFeed();
    });
  }


  initDropbox() {
    this.feedPostSub = this.photoSvc.photos$.subscribe((posts: Array<Photo>) => {
      this.feed = [];
      this.filteredFeed = [];
      posts.forEach(post => {
        const item = {
          body: {name: post.name, fullPicture: post.displayPath},
          createdDate: post.timestamp,
          meta: [
            {name: "Kind", value: post.kind },
            {name: "Path", value: post.path },
            {name: "Size", value: post.size }
          ]
        };
        this.feed.push(item);
      });

      this.filterAndSortFeed();
    });
  }

  initLocations() {
    this.feedPostSub = this.locationsSvc.data$.subscribe((posts: Array<Location>) => {
      console.log(posts);
      this.locations = posts;
      this.feed = [];
      this.filteredFeed = [];
      posts.forEach(post => {
        const item = {
          body: {message: post.latitude + ", " + post.longitude},
          createdDate: post.timestamp,
          meta: [
            {name: "Accuracy", value: post.accuracy },
            {name: "Altitude", value: post.altitude },
            {name: "Altitude accuracy", value: post.altitude_accuracy },
            {name: "Heading", value: post.heading },
            {name: "Speed", value: post.speed },
            {name: "ID", value: post.id }
          ]
        };
        this.feed.push(item);
      });

      this.filterAndSortFeed();
    });
  }


  setFromDate(event: any) {
    if(event.target.value === ""){
      this.fromDate = moment("1970-01-01");
    } else {
      this.fromDate = moment(event.target.value);
    }
    this.filterAndSortFeed();
  }

  setToDate(event: any) {
    if(event.target.value === ""){
      this.toDate = moment();
    } else {
      this.toDate = moment(event.target.value);
    }
    this.filterAndSortFeed();
  }


  filterAndSortFeed() {
    // filter by selected dates
    let fromDate = this.fromDate;
    let toDate = this.toDate;

    if( !moment.isMoment(fromDate) ){
      fromDate = moment("1970-01-01");
    }

    if( !moment.isMoment(toDate) ){
      toDate = moment();
    }

    this.filteredFeed = this.feed.filter( item => {
        return ( item.createdDate.isBefore(toDate) && item.createdDate.isAfter(fromDate)  );
    });

    // sort array by date - most recent first
    this.filteredFeed = this.filteredFeed.sort( (a, b) => {
        const result = a.createdDate.isBefore(b.createdDate) ? 1 : -1;
        return result;
    });

    //console.log(this.filteredFeed);
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
