import { Component, OnInit } from '@angular/core';
import { sortedUniqBy, unionBy } from 'lodash';
import { PhotosService } from '../photos.service';
import { Photo, ExpandedTime } from '../../shared/interfaces/index';
import * as moment from 'moment';

@Component({
  selector: 'rump-photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['photos.component.scss']
})
export class PhotosComponent implements OnInit {
  private images: Array<Photo> = [];
  private timeline: Array<ExpandedTime> = [];
  private selectedTime: ExpandedTime = null;
  private showTimeline: boolean;
  private _sub;

  constructor(private _photosSvc: PhotosService) {}

  ngOnInit() {
    this.showTimeline = true;
    this._sub = this._photosSvc.photos$.subscribe(images => {
      this.images = images;
      this.addDatesToTimeline(images);
    });

    this._photosSvc.getRecentPhotos();
  }

  selectControlsTime(relativeTime: string) {
    switch (relativeTime) {
      case 'today':
        this.selectedTime = new ExpandedTime(moment());
        break;
      case 'yesterday':
        this.selectedTime = new ExpandedTime(moment().subtract(1, 'days'));
        break;
      case 'all':
        this.selectedTime = null;
        break;
    }
  }

  selectTime(event) {
    this.selectedTime = event;
  }

  isSelectedTime(relativeTime: string): boolean {
    if (this.selectedTime === null) {
      return false;
    }
    switch (relativeTime) {
      case 'today':
        return this.selectedTime.unixDayStart === moment().startOf('day').unix();
      case 'yesterday':
        return this.selectedTime.unixDayStart === moment().subtract(1, 'days').startOf('day').unix();
    }
  }

  private addDatesToTimeline(dataPoints: Array<Photo>) {
    let timestamps: Array<ExpandedTime> = sortedUniqBy(
      dataPoints.map(dp => new ExpandedTime(dp.timestamp)).sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1),
      'unixDayStart');

    this.timeline = unionBy(this.timeline, timestamps, 'unixDayStart').sort((a, b) => a.unixDayStart > b.unixDayStart ? -1 : 1);
  }
}
