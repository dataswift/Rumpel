import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Post, Tweet, Event, Photo, Location } from '../../shared/interfaces/index';

@Component({
  selector: 'rump-twitter-view',
  templateUrl: './twitter-view.component.html',
  styleUrls: ['./twitter-view.component.scss']
})
export class TwitterViewComponent implements OnInit {

  @Input() item: Array<Tweet>;

  constructor() { }

  ngOnInit() {
  }

}
