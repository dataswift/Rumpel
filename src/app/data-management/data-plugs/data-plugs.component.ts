/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DataPlugService } from '../data-plug.service';
import { Router } from '@angular/router';
import { DataPlug } from '../../shared/interfaces/data-plug.interface';

@Component({
  selector: 'rump-data-plugs',
  templateUrl: './data-plugs.component.html',
  styleUrls: ['./data-plugs.component.scss']
})
export class DataPlugsComponent implements OnInit {
  public dataplugs: Observable<DataPlug[]>;
  private windowRef: any;

  constructor(private dataplugSvc: DataPlugService,
              private router: Router) { }

  ngOnInit() {
    this.dataplugs = this.dataplugSvc.dataplugs$;
  }

  openPlugDataView(plug: DataPlug) {
    if (plug.active === false) {
      const loginName = this.formatPlugName(plug.name);

      const w = window.innerWidth;
      const h = window.innerHeight;

      const popupWidth = w * 0.6; const left = w * 0.2;
      const popupHeight = h * 0.7; const top = h * 0.15;

      this.windowRef = window.open(
        '', `Setting up ${plug.name} data plug`,
        `menubar=no,location=yes,resizable=yes,status=yes,chrome=yes,left=${left},top=${top},width=${popupWidth},height=${popupHeight}`);

      this.dataplugSvc.getPlugRedirectUrl(loginName, plug.url)
        .subscribe(redirectUrl => {
          this.windowRef.location = redirectUrl;
        });
    } else {
      // this.router.navigate([plug.page]);
      this.router.navigate(['/dataplugs/data/', plug.name.toLowerCase()]);
    }
  }

  formatPlugName(name): string {
    return (name.charAt(0).toUpperCase() + name.slice(1));
  }


}
