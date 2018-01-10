/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { DataPlugService } from '../data-plug.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rum-tile-data-plugs',
  templateUrl: 'tile-data-plugs.component.html',
  styleUrls: ['tile-data-plugs.component.scss']
})
export class TileDataPlugsComponent implements OnInit {
  public dataplugs: Observable<Array<any>>;
  private windowRef: any;

  constructor(private dataplugsSvc: DataPlugService) {}

  ngOnInit() {
    this.dataplugs = this.dataplugsSvc.dataplugs$;
  }

  openPlugPopup(plug: any) {
    const loginName = plug.name.charAt(0).toUpperCase() + plug.name.slice(1);

    const w = window.innerWidth;
    const h = window.innerHeight;

    const popupWidth = w * 0.6; const left = w * 0.2;
    const popupHeight = h * 0.7; const top = h * 0.15;

    this.windowRef = window.open(
      '', `Setting up ${plug.name} data plug`,
      `menubar=no,location=yes,resizable=yes,status=yes,chrome=yes,left=${left},top=${top},width=${popupWidth},height=${popupHeight}`
    );

    this.dataplugsSvc.getPlugRedirectUrl(loginName, plug.url)
      .subscribe(redirectUrl => {
        this.windowRef.location = redirectUrl;
      });
  }



}
