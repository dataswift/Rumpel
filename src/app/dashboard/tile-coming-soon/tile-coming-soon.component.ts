/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rump-tile-coming-soon',
  templateUrl: 'tile-coming-soon.component.html',
  styleUrls: ['tile-coming-soon.component.scss']
})
export class TileComingSoonComponent implements OnInit {
  @Input() bkgImage: string;
  @Input() icon: string;
  @Input() title: string;

  constructor() {}

  ngOnInit() {
  }

}
