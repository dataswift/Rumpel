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
  private showError: boolean;
  private displayMessage: string;

  @Output() serviceToggled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notablesSvc: NotablesService) { }

  ngOnInit() {
    this.showError = false;

    this.notablesSvc.notablesMeta$.subscribe((notablesState: NotablesServiceMeta) => {
      this.notablesState = notablesState;
      this.displayMessage = "";
    });
  }

  toggleSharing(provider) {
    if (this.notablesState.canPost.indexOf(provider.name) === -1) {
      this.showError = true;
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
