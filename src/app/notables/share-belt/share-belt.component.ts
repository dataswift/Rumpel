import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { NotablesService } from '../notables.service';

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
    allowedActions: { canPost: boolean; canExpire: boolean };
    phata: string;
  };
  private showError: boolean;

  @Output() serviceToggled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notablesSvc: NotablesService,
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
    this.notablesSvc.claimNotablesOffer().subscribe(resBody => {
      this.router.navigate(['dataDebit', resBody.dataDebitId, 'confirm']);
    });
  }
}
