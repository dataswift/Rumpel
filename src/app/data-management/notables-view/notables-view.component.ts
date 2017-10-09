import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Post, Tweet, Event, Photo, Location, Notable } from '../../shared/interfaces/index';

@Component({
  selector: 'rump-notables-view',
  templateUrl: './notables-view.component.html',
  styleUrls: ['./notables-view.component.scss']
})
export class NotablesViewComponent implements OnInit {

  @Input() item: Array<Notable>;

  constructor() { }

  ngOnInit() {
  }

}
