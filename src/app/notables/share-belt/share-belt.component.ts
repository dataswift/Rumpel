import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { NotablesService } from '../notables.service';
import { HatApiService } from '../../services/hat-api.service';

@Component({
  selector: 'rump-share-belt',
  templateUrl: './share-belt.component.html',
  styleUrls: ['./share-belt.component.scss']
})
export class ShareBeltComponent implements OnInit {
  @Input() hatDomain: string;
  private services: any[];
  private notablesState: {
    notablesOfferClaimed: boolean;
    dataDebit: { confirmed: boolean; id: string };
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
        shared: false
      },
      {
        name: 'facebook',
        logoUrl: 'assets/icons/facebook-plug.png',
        shared: false
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
      this.router.navigate(['/dataDebit', this.notablesState.dataDebit.id, 'confirm']);
    });
  }

  confirmNotablesDataDebit() {
    this._hatSvc.updateDataDebit(this.notablesState.dataDebit.id, 'enable').subscribe(res => {
      this.notablesState.dataDebit.confirmed = true;
    });
  }
}
