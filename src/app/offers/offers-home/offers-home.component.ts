import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DataOfferService } from '../data-offer.service';
import { AuthService } from '../../core/services/auth.service';
import { APP_CONFIG, AppConfig } from '../../app.config';

import { Offer, OffersStorage } from '../offer.interface';

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

  public offers: Offer[] = [];
  public acceptedOffers: Offer[] = [];

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
              private authSvc: AuthService,
              private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    this.offersSub = this.dataOfferSvc.offers$.subscribe((offers: OffersStorage) => {
      this.offers = this.setOfferImage(offers.availableOffers);
      this.acceptedOffers = this.setOfferImage(offers.acceptedOffers);

      if (this.offers.length === 0) {
        this.noOffers = 'Sorry, there are no offers matching the data you have made available';
      }

      if (this.acceptedOffers.length === 0) {
        this.noAcceptedOffers = `You haven't accepted any offers yet!`;
      }
    },
    error => { console.log(error); });

    this.authSvc.auth$.pipe(filter((authenticated: boolean) => authenticated))
      .subscribe(() =>  this.dataOfferSvc.fetchUserAwareOfferList());
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
