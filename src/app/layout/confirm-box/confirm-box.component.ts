/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Input} from '@angular/core';
import { DialogService } from '..//dialog.service';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { DataOfferService } from '../../data-management/data-offer.service';

@Component({
  selector: 'rump-confirm-box',
  templateUrl: './confirm-box.component.html'
})
export class ConfirmBoxComponent implements OnInit {
  private destroy: Function;
  public remove = false;
  @Input() title: string;
  @Input() icon: string;
  @Input() acceptButtonEnabled = true;
  @Input() acceptButtonText = 'Proceed';
  @Input() message = '';
  @Input() showConfirmationOnAccept = false;
  @Input() confirmationMessage = '';
  @Input() accept: () => void = () => {};
  @Input() reject: () => void = () => {};


  constructor(  private dialogSvc: DialogService,
                private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
  }

  closeModal(): void {

    const self = this;
    this.remove = true;
    setTimeout(function(){
      self.destroy();
    }, 1000);
  }

  acceptButton(): void {

    if (this.showConfirmationOnAccept) {
      this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
        title: this.title,
        icon: this.icon,
        message: this.confirmationMessage
      });
    }

    this.closeModal();
  }

}
