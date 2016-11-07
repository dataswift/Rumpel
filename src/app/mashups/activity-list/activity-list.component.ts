import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core'
import { Moment } from 'moment';
import {Post} from "../../shared/interfaces/post.interface";
import {Photo} from "../../shared/interfaces/photo.interface";
import {Notable} from "../../shared/interfaces/notable.class";

@Component({
  selector: 'rump-activity-list',
  templateUrl: 'activity-list.component.html',
  styleUrls: ['activity-list.component.scss']
})
export class ActivityListComponent implements OnInit, OnChanges {
  @Input() componentHeight: string;
  @Input() componentWidth: string;
  @Input() posts: Array<Post>;
  @Input() events: Array<Event>;
  //@Input() locations: Array<Location>;
  @Input() photos: Array<Photo>;
  @Input() notables: Array<Notable>;
  @Input() timeSelected: Moment;

  constructor() {
  }

  ngOnChanges() {

  }

  ngOnInit() {
  }

}
