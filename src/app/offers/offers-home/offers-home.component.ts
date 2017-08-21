import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DataOfferService } from '../data-offer.service';
import { DialogService } from '../../layout/dialog.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.interface';
import { InfoBoxComponent } from '../../layout/info-box/info-box.component';
import { APP_CONFIG, IAppConfig } from '../../app.config';

@Component({
  selector: 'rump-offers-home',
  templateUrl: './offers-home.component.html',
  styleUrls: ['./offers-home.component.scss']
})
export class OffersHomeComponent implements OnInit {

  public currentPage = 'available';
  private offersSub: Subscription;
  public noOffers = '';
  public noAcceptedOffers = '';

  public offers: any = [];
  public acceptedOffers: any = [];

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private dialogSvc: DialogService,
              private userSvc: UserService,
              private dataOfferSvc: DataOfferService) { }

  ngOnInit() {

    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      title: 'Heads Up!',
      message:
      `We are beta testing data offers from DataBuyers at ${this.config.databuyer.url}. These data offers are REAL ` +
      `(except where they indicate otherwise), but offers requesting for PIIs (personal identity identifiers) and ` +
      `offers giving cash for data have been disabled during beta. Please give us feedback at ` +
      `<a href="mailto:contact@hatdex.org">contact@hatdex.org</a>.`
    });

    this.offersSub = this.dataOfferSvc.offers$.subscribe(offers => {
      offers = this.setOfferImage(offers);

      this.offers = offers.filter(function(offer) {

          let claimStatus = 'untouched';
          if (offer.claim && offer.claim.status) {
            claimStatus = offer.claim.status;
          }

          let moreUsersRequired = false;
          if (offer.requiredMaxUser === 0) {
            moreUsersRequired = true;
          } else {
            moreUsersRequired = (offer.requiredMaxUser - offer.totalUserClaims) > 0;
          }

          return (  claimStatus === 'untouched' &&
                    moreUsersRequired &&
                    offer.expires > Date.now()
                  )
      });


      this.acceptedOffers = offers.filter(function(offer) {

          let claimStatus = 'untouched';
          if (offer.claim && offer.claim.status) {

            /* use for testing
            offer.claim.status = 'completed';
            offer.reward.rewardType = 'Voucher';
            offer.reward.codes = ['56456', '35346'];
            */

            claimStatus = offer.claim.status;
          }

          return (  claimStatus !== 'untouched' &&
                    claimStatus !== 'rejected'
                  )
      });


      if (this.offers.length === 0) {
        this.noOffers = 'Sorry, there are no offers matching the data you have made available';
      }

      if (this.acceptedOffers.length === 0) {
        this.noAcceptedOffers = 'You haven\'t accepted any offers yet!';
      }


    },
    error => { console.log(error); });


    this.userSvc.user$.filter((user: User) => user.authenticated)
      .subscribe(() =>  this.dataOfferSvc.fetchUserAwareOfferListSubscription());
  }



  setOfferImage(offers): any {
    for (let i = 0; i < offers.length; i++) {

      if (offers[i].illustrationUrl === '') {
        const offerType = offers[i].reward.rewardType.toLowerCase();

        if ( offerType === 'cash' ) {
          offers[i].illustrationUrl = 'assets/images/coin-icon.svg';
        } else if ( offerType === 'voucher' ) {
          offers[i].illustrationUrl = 'assets/images/voucher-icon.svg';
        } else if ( offerType === 'service' ) {
          offers[i].illustrationUrl = 'assets/images/badge-icon.svg';
        }

      }
    }

    return offers;
  }


}
