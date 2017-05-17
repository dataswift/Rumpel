import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post, Tweet, Photo, Notable } from '../../shared/interfaces/index';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ExpandedTime } from '../../shared/interfaces/index';

declare var $: any;

@Component({
  selector: 'rump-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {

  @Input() day: any;
  @Input() i: any;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }


  scrollToItem(num: number) {
    this.selection.emit( num );
  }


}
