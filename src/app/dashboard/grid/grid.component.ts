/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UiStateService } from '../../services';
import { DataTable } from '../../shared/interfaces/data-table.interface';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy, AfterViewInit {
  public state: any;
  public showLocationsTile = false;
  public showEventsTile = false;
  public showPostsTile = false;
  public tileHeights: { notables: number; profile: number };
  private sub: Subscription;

  constructor(private uiState: UiStateService) { }

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this.tileHeights = { notables: 2, profile: 1 };

    this.sub = this.uiState.tables$.subscribe((tables: DataTable[]) => {
      this.showLocationsTile = tables.findIndex(this.searchHandler('locations')) > -1;
      this.showPostsTile = tables.findIndex(this.searchHandler('posts tweets music_listens')) > -1;
      this.showEventsTile = tables.findIndex(this.searchHandler('events')) > -1;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    $('.grid').packery({
      // options
      gutter: 42,
      itemSelector: '.grid-item',
      percentPosition: true
    });
  }

  private searchHandler(names: string) {
    return (table: DataTable) => names.includes(table.name);
  }
}
