import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataOfferService } from '../data-offer.service';
import { DialogService } from '../../core/dialog.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.interface';
import { InfoBoxComponent } from '../../core/info-box/info-box.component';
import { APP_CONFIG, AppConfig } from '../../app.config';

import * as moment from 'moment';

@Component({
  selector: 'rum-offers-home',
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

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
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

      this.offers = offers.filter(offer => {
        let claimStatus = 'untouched';
        if (offer.claim && offer.claim.status) {
          claimStatus = offer.claim.status;
        }

        const moreUsersRequired = offer.requiredMaxUser === 0 || (offer.requiredMaxUser - offer.totalUserClaims) > 0;

        return claimStatus === 'untouched' && moreUsersRequired && moment(offer.expires).isAfter();
      });

      this.acceptedOffers = offers.filter(offer => {
        let claimStatus = 'untouched';
        if (offer.claim && offer.claim.status) {
          claimStatus = offer.claim.status;
        }

        return claimStatus !== 'untouched' && claimStatus !== 'rejected';
      });

      if (this.offers.length === 0) {
        this.noOffers = 'Sorry, there are no offers matching the data you have made available';
      }

      if (this.acceptedOffers.length === 0) {
        this.noAcceptedOffers = `You haven't accepted any offers yet!`;
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
