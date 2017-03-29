/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { NotablesService } from '../notables.service';
import { Notable } from '../../shared/interfaces/notable.class';

import {NotablesServiceMeta} from '../../shared/interfaces/notables-service-meta.interface';
import {DialogService} from '../../layout/dialog.service';
import {DialogBoxComponent} from '../../layout/dialog-box/dialog-box.component';
import {DataPlugService} from '../../data-management/data-plug.service';

@Component({
  selector: 'rump-share-belt',
  templateUrl: './share-belt.component.html',
  styleUrls: ['./share-belt.component.scss']
})
export class ShareBeltComponent implements OnInit {
  @Input() hatDomain: string;
  @Input() currentNotable: Notable;
  @Input() parentError: string;
  private notablesState: NotablesServiceMeta;
  private dataPlugError: string;
  private displayMessage: string;
  private sharedOn = { facebook: false, twitter: false, marketsquare: false };
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

  @Output() serviceToggled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notablesSvc: NotablesService,
              private dialogSvc: DialogService,
              private dataPlugSvc: DataPlugService) { }

  ngOnInit() {
    this.dataPlugError = null;

    this.notablesSvc.notablesMeta$.subscribe((notablesState: NotablesServiceMeta) => {
      this.notablesState = notablesState;
      this.displayMessage = null;
    });

    this.notablesSvc.editedNotable$.subscribe((editedNotable: Notable) => {
      this.sharedOn = { facebook: false, twitter: false, marketsquare: false };
      for (const provider of editedNotable.shared_on) {
        this.sharedOn[provider] = true;
      }
    });
  }

  toggleSharing(provider) {
    if (provider.name === 'marketsquare' || this.dataPlugSvc.status(provider.name)) {
      this.sharedOn[provider.name.toLowerCase()] = !this.sharedOn[provider.name.toLowerCase()];
      this.serviceToggled.emit({
        action: this.sharedOn[provider.name.toLowerCase()] ? 'SHARE' : 'STOP',
        service: provider.name
      });
    } else {
      this.dataPlugError = provider.name;
    }
  }

  claimNotablesOffer(): void {
    this.displayMessage = 'Processing... please wait.';
    this.notablesSvc.setupNotablesService().subscribe(res => {
      if (res) {
        this.notablesState.offerClaimed = true;
        this.notablesSvc.updateNotablesState();
      } else {
        this.dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
          title: 'Something went wrong',
          message: 'There was a problem setting up your notables service. Please report the problem and try again by refreshing this page.',
          buttons: [{
            title: 'Report the Problem',
            link: `http://forum.hatcommunity.org/c/hat-users`
          }]
        });
      }

      this.displayMessage = null;
    });
  }

  confirmNotablesDataDebit(): void {
    this.displayMessage = 'Confirming the data debit';
  }
}
