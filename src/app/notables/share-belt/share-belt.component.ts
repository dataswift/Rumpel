import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { NotablesService } from '../notables.service';
import { HatApiService } from '../../services/hat-api.service';
import { Notable } from "../../shared/interfaces/notable.class";

import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'rump-share-belt',
  templateUrl: './share-belt.component.html',
  styleUrls: ['./share-belt.component.scss']
})
export class ShareBeltComponent implements OnInit {
  @Input() hatDomain: string;
  @Input() currentNotable: Notable;
  @Input() parentError: string;
  private services: any[];
  private notablesState: {
    notablesOfferClaimed: boolean;
    userMessage: string;
    dataDebit: { confirmed: boolean; id: string; dateCreated: Moment; };
    allowedActions: { canPost: boolean; canExpire: boolean };
    phata: string;
  };
  private showError: boolean;
  private displayMessage: string;

  @Output() serviceToggled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notablesSvc: NotablesService) { }

  ngOnInit() {
    this.showError = false;

    this.services = [
      {
        name: 'marketsquare',
        logoUrl: 'assets/icons/marketsquare-icon.png',
        shared: this.currentNotable.shared_on.indexOf('marketsquare') > -1
      },
      {
        name: 'facebook',
        logoUrl: 'assets/icons/facebook-plug.png',
        shared: this.currentNotable.shared_on.indexOf('facebook') > -1
      }
    ];

    this.notablesSvc.notablesMeta$.subscribe(notablesState => {
      this.notablesState = notablesState;
      this.displayMessage = "";
    });
  }

  toggleSharing(service) {
    if (service.name === 'facebook' && this.notablesState.allowedActions.canPost === false) {
      this.showError = true;
    } else {
      service.shared = !service.shared;
      this.serviceToggled.emit({
        action: service.shared ? 'SHARE' : 'STOP',
        service: service.name
      });
    }

  }

  claimNotablesOffer(): void {
    this.displayMessage = "Processing... please wait.";
    this.notablesSvc.setupNotablesService().subscribe(res => {
      this.notablesState.notablesOfferClaimed = true;
      this.notablesSvc.updateNotablesState();
    });
  }

  confirmNotablesDataDebit(): void {
    this.displayMessage = "Confirming the data debit";
  }
}
