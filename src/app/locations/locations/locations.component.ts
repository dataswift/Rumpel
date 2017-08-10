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

import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'rump-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {
  public locations: Array<Location>;
  public safeSize;
  public selectedTime: string;
  public lowerTimeBound: Moment;
  public upperTimeBound: Moment;
  private totalDP = 0;
  public loading = false;
  private date: any;

  private sub: Subscription;

  constructor(private locationsSvc: LocationsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.locations = [];
    this.selectedTime = 'all';

    this.locationsSvc.loading$.subscribe(isLoading => this.loading = isLoading);

    this.sub = this.locationsSvc.data$.subscribe(locations => {
      this.locations = locations;

      if (locations.length > this.totalDP) {
        this.totalDP = locations.length;
        this.locationsSvc.getMoreData(500, 5000);
      }
    });

    this.safeSize = this.sanitizer.bypassSecurityTrustStyle($(window).height() - 350 + 'px');
    const thisScope = this;

    $(window).resize(function() {
      thisScope.safeSize = thisScope.sanitizer.bypassSecurityTrustStyle($(window).height() - 180 + 'px');
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  selectLocationTime(event) {
    switch (event.target.value) {
      case 'today':
        this.lowerTimeBound = moment().startOf('day');
        this.upperTimeBound = moment();
        break;
      case 'yesterday':
        this.lowerTimeBound = moment().subtract(1, 'days').startOf('day');
        this.upperTimeBound = moment().subtract(1, 'days').endOf('day');
        break;
      case 'last week':
        this.lowerTimeBound = moment().subtract(7, 'days').startOf('day');
        this.upperTimeBound = moment();
        break;
      case 'all':
        this.lowerTimeBound = null;
        this.upperTimeBound = null;
        break;
      default:
        this.lowerTimeBound = null; this.upperTimeBound = null;
    }
    this.selectedTime = event.target.value;
  }

  submitForm(form): void {
    const formContent = form.value;
    const startTime = moment(formContent.date).format('X');
    const endTime = moment(formContent.date).endOf('day').format('X');

    this.locationsSvc.getTimeIntervalData(startTime, endTime);
    this.lowerTimeBound = moment(formContent.date);
    this.upperTimeBound = moment(formContent.date).endOf('day');
  }

  showPopover(event) {
    $('[data-toggle="popover"]').popover();
  }
}
