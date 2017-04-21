/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'rump-tile-header',
  templateUrl: 'tile-header.component.html',
  styleUrls: ['tile-header.component.scss']
})
export class TileHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() iconName: string;
  @Input() backColor: string;
  @Input() info: string;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  showPopover(event) {
    // Handle special case for Locations tile
    if (this.title === 'Locations') {
      window.location.href = 'http://www.hatdex.org/rumpel-lite/';
    } else {
      $(event.target.parentNode).popover('show');
    }
  }

  navigateTo(pageName: string, event) {
    if (!event.target.className.includes('tile-expand')) {
      this.router.navigate([pageName]);
    }
  }

}
