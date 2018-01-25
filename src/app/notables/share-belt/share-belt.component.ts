/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Input, EventEmitter, Output, Inject} from '@angular/core';

import { NotablesService } from '../notables.service';
import { DialogService } from '../../core/dialog.service';
import { DialogBoxComponent } from '../../core/dialog-box/dialog-box.component';
import { DataPlugService } from '../../data-management/data-plug.service';

import { Notable } from '../../shared/interfaces/notable.class';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { DexOfferClaimRes } from '../../shared/interfaces/dex-offer-claim-res.interface';
import { DataDebit } from '../../shared/interfaces/data-debit.interface';
import {Observable} from 'rxjs/Observable';
import {DataPlug} from '../../shared/interfaces/data-plug.interface';

@Component({
  selector: 'rum-share-belt',
  templateUrl: './share-belt.component.html',
  styleUrls: ['./share-belt.component.scss']
})
export class ShareBeltComponent implements OnInit {
  @Input() hatDomain: string;
  @Input() currentNotable: Notable;
  @Input() parentError: string;
  @Output() notableUpdated: EventEmitter<Notable> = new EventEmitter<Notable>();
  public dataPlugError: string;
  public displayMessage: string;
  public offerClaimIsConfirmed: boolean;
  public shareOptions: Observable<DataPlug[]>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private notablesSvc: NotablesService,
              private dialogSvc: DialogService,
              private dataPlugSvc: DataPlugService) { }

  ngOnInit() {
    this.dataPlugError = null;

    this.shareOptions = this.dataPlugSvc.notablesEnabledPlugs$;

    this.notablesSvc.getNotablesOfferClaimStatus().subscribe((offerClaim: DexOfferClaimRes) => {
      this.offerClaimIsConfirmed = offerClaim.confirmed;
    });
  }

  toggleSharing(provider) {
    if (provider.active === true) {
      const index = this.currentNotable.shared_on.indexOf(provider.name.toLowerCase());
      if (index > -1) {
        this.currentNotable.shared_on.splice(index, 1);
      } else {
        this.currentNotable.shared_on.push(provider.name.toLowerCase());
      }

      this.notableUpdated.emit(new Notable(this.currentNotable));
    } else {
      this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
        title: `${provider.name} data plug not connected`,
        message: `Looks like your ${provider.name} data plug is not yet connected to `
        + `your HAT. As a result, notables cannot be shared on ${provider.name}. `
        + 'Do you want to set it up now?',
        buttons: [{
          title: `Connect ${provider.name} plug now`,
          link: `${provider.url}/authenticate/hat`
        }]
      });
    }
  }

  claimNotablesOffer(): void {
    this.displayMessage = 'Processing... please wait.';
    this.notablesSvc.setupNotablesService().subscribe({
      next: (dataDebit: DataDebit) => {
        this.offerClaimIsConfirmed = true;
        this.displayMessage = null;
      },
      error: error => {
        this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
          title: 'Something went wrong',
          message: 'There was a problem setting up your notables service. Please report the problem and try again by refreshing this page.',
          buttons: [{
            title: 'Report the Problem',
            link: `http://forum.hatcommunity.org/c/hat-users`
          }]
        });

        this.displayMessage = null;
      }});
  }

  confirmNotablesDataDebit(): void {
    this.displayMessage = 'Confirming the data debit';
  }
}
