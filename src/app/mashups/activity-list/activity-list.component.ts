/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Moment } from 'moment';
import {Post} from '../../shared/interfaces/post.interface';
import {Photo} from '../../shared/interfaces/photo.interface';
import {Notable} from '../../shared/interfaces/notable.class';

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
  // @Input() locations: Array<Location>;
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
