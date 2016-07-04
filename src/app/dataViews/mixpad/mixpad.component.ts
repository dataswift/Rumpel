import { Component, OnInit } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { MapComponent } from '../map/map.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { ViewByDayComponent } from '../view-by-day/view-by-day.component';
import { EventsService, LocationsService, ImagesService } from '../../services';
import { FilterByTime } from '../../pipes/filter-by-time.pipe';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'rump-mixpad',
  templateUrl: 'mixpad.component.html',
  styleUrls: ['mixpad.component.css'],
  directives: [MapComponent, TimelineComponent, ViewByDayComponent],
  pipes: [FilterByTime]
})
export class MixpadComponent implements OnInit {
  private eventSub;
  private imgSub;
  public selectedTime: any;
  public shownComponents: any;
  public locations$;
  public events;
  public images;
  public locations;
  public safeSize;
  public timeline: Array<any>;

  constructor(private locationsSvc: LocationsService,
              private eventsSvc: EventsService,
              private imagesSvc: ImagesService,
              private sanitizer: DomSanitizationService) {
    this.timeline = [moment()];
    this.events = [];
    this.images = [];
    this.shownComponents = { map: true, events: true, photos: true, timeline: true };
  }

  ngOnInit() {
    this.locations$ = this.locationsSvc.showAll().subscribe(
      locations => {
        this.locations = locations;
      }
    );

    this.eventSub = this.eventsSvc.showAll().subscribe(
      events => {
        for (let event of events) {
          const dayFound = this.timeline.find(day => day.isSame(event.start, 'day'));
          if (dayFound) continue;
          this.timeline.push(event.start);
        }

        this.events = events;
      }
    );

    // this.imgSub = this.imagesSvc.images$.subscribe(images => {
    //   for (let img of images) {
    //     const dayFound = this.timeline.find(day => day.isSame(img.start, 'day'));
    //     if (dayFound) continue;
    //     this.timeline.push(img.start);
    //   }
    //   this.images = images;
    // });

    // this.imagesSvc.loadAll();
    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('85vh');
  }

  onViewReset() {
    this.selectedTime = null;
  }

}
