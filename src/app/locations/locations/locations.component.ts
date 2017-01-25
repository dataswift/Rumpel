/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '../../shared/interfaces';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  public locations: Array<Location>;
  public safeSize;
  private selectedTime: string;
  private sub;

  constructor(private locationsSvc: LocationsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.locations = [];
    this.selectedTime = 'all';

    this.sub = this.locationsSvc.data$.subscribe(locations => {
      this.locations = locations;

      this.locationsSvc.getMoreData(500, 5000);
    });

    this.locationsSvc.getRecentData();

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('73em');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  selectLocationTime(event) {
    this.selectedTime = event.target.value;
  }
}
