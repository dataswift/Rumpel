/*
 * Copyright (C) 2016 - 2019 DataSwift Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@dataswift.io> 2016
 */

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationsService } from '../locations.service';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { LocationIos } from '../../shared/interfaces/location.interface';

@Component({
  selector: 'rum-tile-map',
  templateUrl: 'tile-map.component.html',
  styleUrls: ['tile-map.component.scss']
})
export class TileMapComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() info;
  public locations: HatRecord<LocationIos>[];
  private sub;
  public safeSize;

  constructor(private sanitizer: DomSanitizer,
              private locationsSvc: LocationsService) {}

  ngOnInit() {
    this.locations = [];

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('290px');
    this.sub = this.locationsSvc.data$.subscribe((locations: HatRecord<LocationIos>[]) => {
      this.locations = locations;
    });

    this.locationsSvc.getInitData(1000);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
