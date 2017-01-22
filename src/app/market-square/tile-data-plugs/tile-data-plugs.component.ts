/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit } from '@angular/core';
import { DialogBoxComponent } from '../../layout/dialog-box/dialog-box.component';
import { MarketSquareService } from '../market-square.service';
import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../layout/dialog.service';

@Component({
  selector: 'rump-tile-data-plugs',
  templateUrl: 'tile-data-plugs.component.html',
  styleUrls: ['tile-data-plugs.component.scss']
})
export class TileDataPlugsComponent implements OnInit {
  public plugs: Array<any>;
  public hatDomain: string;
  public icons: Array<string>;

  constructor(private marketSvc: MarketSquareService,
              private dialogSvc: DialogService,
              private auth: AuthService) {}

  ngOnInit() {
    this.marketSvc.getDataPlugs().subscribe(plugs => {
      const displayPlugs = plugs.map(plug => {
        let displayPlug = {
          name: plug.name,
          description: plug.description,
          url: plug.url.replace('/dataplug', '/hat/authenticate'),
          icon: plug.name.toLowerCase() + '-plug'
        };

        if (plug.name === 'facebook') displayPlug.icon += '.png';
        else displayPlug.icon += '.svg';

        return displayPlug;
      }).sort((p1, p2) => p1.name > p2.name ? 1 : -1);

      this.plugs = displayPlugs;
    });

    this.hatDomain = this.auth.getDomain();
  }

  displayConfirmDialog(plug: any) {
    let loginName = plug.name.charAt(0).toUpperCase() + plug.name.slice(1);
    if (plug.name === 'location') return plug.url;

    this.dialogSvc.createDialog(DialogBoxComponent, {
      buttons: [{
        title: "Continue",
        link: `https://${this.hatDomain}/hatlogin?name=${loginName}&redirect=${plug.url}`
      }]
    });
  }

  openPlugPopup(plug: any) {
    let loginName = plug.name.charAt(0).toUpperCase() + plug.name.slice(1);

    let w = window.innerWidth;
    let h = window.innerHeight;

    let popupWidth = w * 0.6; let left = w * 0.2;
    let popupHeight = h * 0.7; let top = h * 0.15;

    let windowRef = window.open(
      `https://${this.hatDomain}/hatlogin?name=${loginName}&redirect=${plug.url}`,
      `Setting up ${plug.name} data plug`,
      `menubar=no,location=yes,resizable=yes,status=yes,chrome=yes,left=${left},top=${top},width=${popupWidth},height=${popupHeight}`
    );
  }

}
