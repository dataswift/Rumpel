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
  private totalDP: number = 0;
  public safeSize;

  constructor(private sanitizer: DomSanitizer,
              private locationsSvc: LocationsService) {}

  ngOnInit() {
    this.locations = [];

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('21em');
    this.sub = this.locationsSvc.data$.subscribe(locations => {
      this.locations = locations;

      if (locations.length > this.totalDP) {
        this.totalDP = locations.length;
        this.locationsSvc.getMoreData(500);
      }
    });

    this.locationsSvc.getRecentData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
