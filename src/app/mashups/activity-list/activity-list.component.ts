/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Post, Photo, Notable } from '../../shared/interfaces/index';
import { Moment } from 'moment';

@Component({
  selector: 'rump-activity-list',
  templateUrl: 'activity-list.component.html',
  styleUrls: ['activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  @Input() timeSelected: Moment;
  @Input() componentHeight: string;
  @Input() componentWidth: string;
  @Input() events: Array<Event>;
  @Input() posts: Array<Post>;
  @Input() photos: Array<Photo>;
  @Input() notables: Array<Notable>;
  // @Input() locations: Array<Location>;

  constructor() {
  }

  ngOnInit() {
  }

}
