import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Post, Tweet, Event, Photo, Location } from '../../shared/interfaces/index';

@Component({
  selector: 'rump-facebook-view',
  templateUrl: './facebook-view.component.html',
  styleUrls: ['./facebook-view.component.scss']
})
export class FacebookViewComponent implements OnInit {

  @Input() item: Array<Post>;

  constructor() { }

  ngOnInit() {
  }

}
