/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';

import { DialogService } from '../../core/dialog.service';
import { DialogBoxComponent } from '../../core/dialog-box/dialog-box.component';
import { HatApplicationsService } from '../../explore/hat-applications.service';

import { Notable } from '../../shared/interfaces/notable.class';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { HatApplication } from '../../explore/hat-application.interface';

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
  public notablesAppEnabled: boolean;
  public shareOptions: Observable<HatApplication[]>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private dialogSvc: DialogService,
              private hatAppSvc: HatApplicationsService) { }

  ngOnInit() {
    this.dataPlugError = null;

    this.shareOptions = this.hatAppSvc.notablesEnabledPlugs$;
    this.hatAppSvc.getApplicationDetails('notables')
      .subscribe((app: HatApplication) => this.notablesAppEnabled = app.active);
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

  generateHatLoginLink(): string {
    const currentUrl = window.location.href;

    return `https://${this.hatDomain}/#/hatlogin?name=notables&redirect=${currentUrl}`;
  }
}
