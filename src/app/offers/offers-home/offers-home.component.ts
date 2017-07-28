import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DataOfferService } from '../../data-management/data-offer.service';
import { DialogService } from '../../layout/dialog.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.interface';

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

  constructor(private dialogSvc: DialogService,
              private userSvc: UserService,
              private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    const self = this;

    this.offersSub = this.dataOfferSvc.offers$.subscribe(offers => {
      offers = self.setOfferImage(offers);

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