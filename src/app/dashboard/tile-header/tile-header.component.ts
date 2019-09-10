/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io>
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rum-tile-header',
  templateUrl: 'tile-header.component.html',
  styleUrls: ['tile-header.component.scss']
})
export class TileHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() info: string;
  @Input() pageLink: string;

  constructor() { }

  ngOnInit() { }
}
