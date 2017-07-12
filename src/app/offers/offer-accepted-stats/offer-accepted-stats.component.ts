import { Component, OnInit, Input } from '@angular/core';

import { DialogService } from '../../layout/dialog.service';
import { ConfirmBoxComponent } from '../../layout/confirm-box/confirm-box.component';
import { DataOfferService } from '../../data-management/data-offer.service';

@Component({
  selector: 'rump-offer-accepted-stats',
  templateUrl: './offer-accepted-stats.component.html',
  styleUrls: ['./offer-accepted-stats.component.scss']
})
export class OfferAcceptedStatsComponent implements OnInit {

  @Input() acceptedOffers: any = [];

  public vouchersEarned = 0;
  public vouchersClaimed = 0;

  public servicesEarned = 0;
  public servicesClaimed = 0;

  public cashEarned = 0;
  public cashClaimed = 0;
  public cashFormat = '1.2-2';
  public claimCashEnabled = false;

  public cashWithdrawalThreshold = 20;

  constructor( private dialogSvc: DialogService,
               private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    this.updateStats();
  }

  updateStats() {

    this.vouchersEarned = 0;
    this.vouchersClaimed = 0;

    this.servicesEarned = 0;
    this.servicesClaimed = 0;

    this.cashEarned = 0;
    this.cashClaimed = 0;

    for (let i = 0; i < this.acceptedOffers.length; i++) {

      if ( this.acceptedOffers[i].claim.status === 'redeemed' ) {

            if (this.acceptedOffers[i].reward.rewardType === 'Voucher') {
              this.vouchersClaimed ++;
            } else if (this.acceptedOffers[i].reward.rewardType === 'Cash') {
              this.cashClaimed += this.acceptedOffers[i].reward.value;
            } else if (this.acceptedOffers[i].reward.rewardType === 'Service') {
              this.servicesClaimed ++;
            }
      }

      if ( this.acceptedOffers[i].claim.status === 'claimed' ||
          this.acceptedOffers[i].claim.status === 'claim' ||
          this.acceptedOffers[i].claim.status === 'completed' ||
          this.acceptedOffers[i].claim.status === 'redeemed' ) {

            if (this.acceptedOffers[i].reward.rewardType === 'Voucher') {
              this.vouchersEarned ++;
            } else if (this.acceptedOffers[i].reward.rewardType === 'Cash') {
              this.cashEarned += this.acceptedOffers[i].reward.value;
            } else if (this.acceptedOffers[i].reward.rewardType === 'Service') {
              this.servicesEarned ++;
            }
      }
    }

    if (this.cashEarned > 1000 || this.cashClaimed > 1000) {
      this.cashFormat = '1.0-0';
    } else {
      this.cashFormat = '1.2-2';
    }


    if ((this.cashEarned - this.cashClaimed) >= this.cashWithdrawalThreshold) {
      this.claimCashEnabled = true;
    }


  }



  requestCashTransfer() {

    // add logic for request cash transfer endpoint
        // this.dataOfferSvc.
  }



  showConfirmBox() {
    this.dialogSvc.createDialog<ConfirmBoxComponent>(ConfirmBoxComponent, {
      title: 'Cash earned',
      icon: 'assets/images/coin-icon-green.svg',
      acceptButtonText: 'Request transfer',
      acceptButtonEnabled: this.claimCashEnabled,
      message: `<span class="bold-message">Current balance: £` + (this.cashEarned - this.cashClaimed) + `</span><br>If your cash balance is at least £` + this.cashWithdrawalThreshold + `, you can use the button below to transfer your balance to your PayPal account.`,
      accept: this.requestCashTransfer,
      showConfirmationOnAccept: true,
      confirmationMessage: `Thank you for your request. Within 48 hours, you will receive an email with instructions on how to complete the PayPal transfer.`
    });
  }

}
