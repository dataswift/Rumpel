import { Component, OnInit, Input } from '@angular/core';

import { DialogService } from '../../layout/dialog.service';
import { InfoBoxComponent } from '../../layout/info-box/info-box.component';


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

  constructor( private dialogSvc: DialogService ) { }

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


  }



  showInfobox() {
    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      title: 'Cash earned',
      icon: 'assets/images/coin-icon-green.svg',
      message: `We’re currently working on the functionality to enable you withdraw the cash you have earned from your account.<br><br>
      If you would us to withdraw the cash manually for you now, please <a href="mailto:contact@HATDeX.org?subject=Support%20for%20`
      + window.location.hostname + `">email us</a>.`
    });
  }

}
