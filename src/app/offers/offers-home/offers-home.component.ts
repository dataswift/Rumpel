import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';

import { DataOfferService } from '../../data-management/data-offer.service';
import { DialogService } from '../../layout/dialog.service';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';
import { InfoBoxComponent } from '../../layout/info-box/info-box.component';

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
          return (  claimStatus === 'untouched' &&
                    // (offer.requiredMaxUser - offer.totalUserClaims) > 0 &&
                    offer.expires > Date.now()
                  )
      });


      this.acceptedOffers = offers.filter(function(offer) {

          let claimStatus = 'untouched';
          if (offer.claim && offer.claim.status) {
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

    this.dataOfferSvc.fetchUserAwareOfferListSubscription();

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
