/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { NotablesService } from '../notables.service';
import { Notable } from "../../shared/interfaces/notable.class";

import {NotablesServiceMeta} from "../../shared/interfaces/notables-service-meta.interface";

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
  private dataPlugInfoMap = {
    facebook: {
      displayName: "Facebook",
      redirectUrl: "https://social-plug.hubofallthings.com/hat/authenticate"
    },
    twitter: {
      displayName: "Twitter",
      redirectUrl: "https://twitter-plug.hubofallthings.com/authenticate/hat"
    }
  };

  @Output() serviceToggled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notablesSvc: NotablesService) { }

  ngOnInit() {
    this.dataPlugError = null;

    this.notablesSvc.notablesMeta$.subscribe((notablesState: NotablesServiceMeta) => {
      this.notablesState = notablesState;
      this.displayMessage = "";
    });
  }

  toggleSharing(provider) {
    if (this.notablesState.canPost.indexOf(provider.name) === -1) {
      this.dataPlugError = provider.name;
    } else {
      provider.shared = !provider.shared;
      this.serviceToggled.emit({
        action: provider.shared ? 'SHARE' : 'STOP',
        service: provider.name
      });
    }

  }

  claimNotablesOffer(): void {
    this.displayMessage = "Processing... please wait.";
    this.notablesSvc.setupNotablesService().subscribe(res => {
      this.notablesState.offerClaimed = true;
      this.notablesSvc.updateNotablesState();
    });
  }

  confirmNotablesDataDebit(): void {
    this.displayMessage = "Confirming the data debit";
  }
}
