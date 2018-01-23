/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationsService } from '../locations.service';
import { Subscription } from 'rxjs/Subscription';

import * as moment from 'moment';
import { Filter } from '../../shared/interfaces/bundle.interface';
import { LocationIos } from '../../shared/interfaces/location.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Moment } from 'moment';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rum-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  public locations: Observable<HatRecord<LocationIos>[]>;
  public safeSize;
  public selectedTime: string;
  public loading = false;

  constructor(private locationsSvc: LocationsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.selectedTime = 'all';

    this.locationsSvc.loading$.subscribe(isLoading => this.loading = isLoading);

    this.locations = this.locationsSvc.data$;

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle(window.outerHeight - 350 + 'px');

    window.addEventListener('resize', () => {
      this.safeSize = this.sanitizer.bypassSecurityTrustStyle(window.outerHeight - 180 + 'px')
    });

    this.locationsSvc.getMoreData(500, 5000);
  }

  ngOnDestroy() { }

  applyLocationFilter(event) {
    let filter: Filter[];

    switch (event.target.value) {
      case 'today':
        filter = this.generateLocationsFilter(moment());
        this.locationsSvc.getTimeIntervalData(filter);
        break;
      case 'yesterday':
        filter = this.generateLocationsFilter(
          moment().subtract(1, 'days').startOf('day'),
          moment().subtract(1, 'days').endOf('day'));
        this.locationsSvc.getTimeIntervalData(filter);
        break;
      case 'last week':
        filter = this.generateLocationsFilter(moment().subtract(7, 'days').startOf('day'), moment());
        this.locationsSvc.getTimeIntervalData(filter);
        break;
      case 'all':
        this.locationsSvc.getMoreData(500, 5000);
        break;
    }

    this.selectedTime = event.target.value;
  }

  submitForm(form): void {
    const formContent = form.value;
    const date = moment(formContent.date);

    this.locationsSvc.getTimeIntervalData(this.generateLocationsFilter(date));
  }

  private generateLocationsFilter(startDate: Moment, endDate?: Moment): Filter[] {
    return [{
      field: 'dateCreated',
      operator: {
        operator: 'between',
        lower: startDate.clone().startOf('day').unix(),
        upper: endDate ? endDate.clone().endOf('day').unix() : startDate.clone().endOf('day').unix()
      }
    }];
  }
}
