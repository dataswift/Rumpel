/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Post, Tweet, Photo, Notable } from '../../shared/interfaces/index';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ExpandedTime } from '../../shared/interfaces/index';

declare var $:any;

@Component({
  selector: 'rump-activity-list',
  templateUrl: 'activity-list.component.html',
  styleUrls: ['activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  @Input() componentHeight: string;
  @Output() timeSelected = new EventEmitter<ExpandedTime>();
  // @Input() locations: Array<Location>;
  @Input() eventList: Array<any>;
  @Input() timeline: Array<ExpandedTime>;

  public moment:Moment = moment();



  constructor() {

  }

  ngOnInit() {
    $('[data-toggle="popover"]').popover();
  }




  scrollToItem(index){

    for(var i=0; i<this.eventList.length; i++){
      this.eventList[i].selected = false;
    }

    this.eventList[index].selected = true;
    var time:ExpandedTime = new ExpandedTime( this.eventList[index].timestamp );
    this.timeSelected.emit( time );

    if(index==0){
      $('.activitylist-container').animate({ scrollTop: 0 }, 'slow');
    }

  }

}
