/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from '../../shared/interfaces/index';

@Component({
  selector: 'rump-location-tweet',
  templateUrl: './location-tweet.component.html', 
  styleUrls: ['./location-tweet.component.scss']
})
export class LocationTweetComponent implements OnInit {
  @Input() tweet: Tweet;

  constructor() { }

  ngOnInit() {
  }

}
