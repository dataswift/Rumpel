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
    dataDebit: { confirmed: boolean; id: string; dateCreated: Moment; };
    allowedActions: { canPost: boolean; canExpire: boolean };
    phata: string;
  };
  private showError: boolean;
  private displayMessage: string;

  @Output() serviceToggled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notablesSvc: NotablesService,
              private _hatSvc: HatApiService,
              private router: Router) { }

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

  claimNotablesOffer() {
    this.notablesState.notablesOfferClaimed = true;
    this.displayMessage = "Processing... please wait.";
    this.notablesSvc.claimNotablesOffer().subscribe(resBody => {
      this.notablesState.dataDebit.id = resBody.dataDebitId;
      // this.router.navigate(['/dataDebit', this.notablesState.dataDebit.id, 'confirm']);
      this.confirmNotablesDataDebit();
    });
  }

  confirmNotablesDataDebit() {
    this._hatSvc.updateDataDebit(this.notablesState.dataDebit.id, 'enable').subscribe(res => {
      let response = res.json();
      let update = {
        id: response.key,
        confirmed: response.enabled,
        dateCreated: moment(response.dateCreated)
      }

      this.notablesSvc.updateDataDebitInfo(update);

      this.displayMessage = "";
    });
  }
}
