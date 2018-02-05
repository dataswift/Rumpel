import { Component, OnInit } from '@angular/core';

import { DialogService } from '../../core/dialog.service';
import { ConfirmBoxComponent } from '../../core/confirm-box/confirm-box.component';
import { DataOfferService } from '../data-offer.service';

@Component({
  selector: 'rum-offer-accepted-stats',
  templateUrl: './offer-accepted-stats.component.html',
  styleUrls: ['./offer-accepted-stats.component.scss']
})
export class OfferAcceptedStatsComponent implements OnInit {
  public cashFormat = '1.2-2';
  public claimCashEnabled = false;

  public offersSummary: any;

  public cashWithdrawalThreshold = 20;

  constructor(private dialogSvc: DialogService,
              private offersSvc: DataOfferService) { }

  ngOnInit() {
    this.offersSvc.offersSummary$.subscribe(offersSummary => this.offersSummary = offersSummary);

    this.offersSvc.fetchUserAwareOfferList();
  }

  // updateStats() {
  //   if (this.cashEarned > 1000 || this.cashClaimed > 1000) {
  //     this.cashFormat = '1.0-0';
  //   } else {
  //     this.cashFormat = '1.2-2';
  //   }
  //
  //   if ((this.cashEarned - this.cashClaimed) >= this.cashWithdrawalThreshold) {
  //     this.claimCashEnabled = true;
  //   }
  // }


  requestCashTransfer() {
    this.offersSvc.redeemCash();
  }

  showConfirmBox() {
    this.dialogSvc.createDialog<ConfirmBoxComponent>(ConfirmBoxComponent, {
      title: 'Cash earned',
      icon: 'assets/images/coin-icon-green.svg',
      acceptButtonText: 'Request transfer',
      acceptButtonEnabled: this.claimCashEnabled,
      message: `<span class="bold-message">Current balance: £` + (this.offersSummary.cashClaimed) + `</span>
      <br>If your cash balance is at least £` + this.cashWithdrawalThreshold + `, you can use the button below
      to transfer your balance to your PayPal account.`,
      accept: this.requestCashTransfer,
      showConfirmationOnAccept: true,
      confirmationMessage: `Thank you for your request.
      Within 48 hours, you will receive an email with instructions on how to complete the PayPal transfer.`
    });
  }

}
