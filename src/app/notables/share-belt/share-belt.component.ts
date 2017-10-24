/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Input, EventEmitter, Output, Inject} from '@angular/core';

import { NotablesService } from '../notables.service';
import { Notable } from '../../shared/interfaces/notable.class';

import {NotablesServiceMeta} from '../../shared/interfaces/notables-service-meta.interface';
import {DialogService} from '../../layout/dialog.service';
import {DialogBoxComponent} from '../../layout/dialog-box/dialog-box.component';
import {DataPlugService} from '../../data-management/data-plug.service';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';
import {APP_CONFIG, IAppConfig} from '../../app.config';
import {DexOfferClaimRes} from '../../shared/interfaces/dex-offer-claim-res.interface';
import {DataDebit} from '../../shared/interfaces/data-debit.interface';

@Component({
  selector: 'rump-share-belt',
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
  private dataPlugInfoMap = {
    facebook: {
      displayName: 'Facebook',
      redirectUrl: 'https://social-plug.hubofallthings.com/hat/authenticate'
    },
    twitter: {
      displayName: 'Twitter',
      redirectUrl: 'https://twitter-plug.hubofallthings.com/authenticate/hat'
    }
  };

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private notablesSvc: NotablesService,
              private dialogSvc: DialogService,
              private dataPlugSvc: DataPlugService) { }

  get activeIntegrations(): Array<{ name: string; displayName: string; logoUrl: string; }> {
    return this.config.notables.activeIntegrations;
  }

  ngOnInit() {
    this.dataPlugError = null;

    this.notablesSvc.getNotablesOfferClaimStatus().subscribe((offerClaim: DexOfferClaimRes) => {
      this.offerClaimIsConfirmed = offerClaim.confirmed;
    });
  }

  toggleSharing(provider) {
    if (provider.name === 'hatters' || this.dataPlugSvc.status(provider.name)) {
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
        message: `Looks like your ${this.dataPlugInfoMap[provider.name].displayName} data plug is not yet connected to `
        + `your HAT. As a result, notables cannot be shared on ${this.dataPlugInfoMap[provider.name].displayName}. `
        + 'Do you want to set it up now?',
        buttons: [{
          title: `Connect ${provider.name} plug now`,
          link: this.dataPlugInfoMap[provider.name].redirectUrl
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
