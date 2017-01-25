/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../../shared/interfaces';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'rump-tile-map',
  templateUrl: 'tile-map.component.html',
  styleUrls: ['tile-map.component.scss']
})
export class TileMapComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() info;
  public locations: Array<Location>;
  private sub;
  public safeSize;

  constructor(private sanitizer: DomSanitizer,
              private locationSvc: LocationsService) {}

  ngOnInit() {
    this.locations = [];

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('21em');
    this.sub = this.locationSvc.data$.subscribe(locations => {
      this.locations = locations;

      this.locationSvc.getMoreData(500, 5000)
    });

    this.locationSvc.getRecentData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
