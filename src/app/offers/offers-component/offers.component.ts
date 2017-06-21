import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';

import { DataOfferService } from '../../data-management/data-offer.service';
import { DialogService } from '../../layout/dialog.service';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';

@Component({
  selector: 'rump-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})


export class OffersComponent implements OnInit {

  private offersSub: Subscription;

  public offers: any = [
    {
      id: 'b25334ab-707a-42e7-9a38-6d1e65604602',
      title: '£1 hot drink voucher',
      illustrationUrl: '',
      expires: 1527116400000,
      shortDescription: 'hello jon',
      pii: true,
      collectFor: 259200000,
      requiredMaxUser: 1000,
      totalUserClaims: 587,
      reward: {rewardType: 'Cash'},
      requiredDataDefinition:
          [{
            'source': 'Facebook',
            'datasets': [{'name': 'photo', 'description': 'your photos'}, {'name': 'photo', 'description': 'your photos'}]
          }]
    },
    {
      id: '456',
      title: 'Compare your health data to other people',
      illustrationUrl: 'assets/icons/twitter-plug.svg',
      expires: 1497889035000,
      shortDescription: 'hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon',
      pii: false,
      collectFor: 691200000,
      requiredMaxUser: 100,
      totalUserClaims: 100,
      reward: {rewardType: 'Voucher'},
      requiredDataDefinition:
          [{
            'source': 'Twitter',
            'datasets': [{'name': 'title', 'description': 'body'}, {'name': 'photo', 'description': 'your photos'}]
          }]
    },
    {
      id: '783', title: 'Share 1 day of your Fitbit data and earn £0.10p',
      illustrationUrl: 'assets/icons/fitbit-plug.svg',
      expires: 1327116400000,
      shortDescription: 'hello jon',
      pii: true,
      collectFor: 86400000,
      requiredMaxUser: 10,
      totalUserClaims: 1,
      reward: {rewardType: 'Service'},
      requiredDataDefinition:
          [{
            'source': 'Location',
            'datasets': [{'name': 'photo', 'description': 'your photos'}, {'name': 'photo', 'description': 'your photos'}]
          },
          {
            'source': 'Facebook',
            'datasets': [{'name': 'photo', 'description': 'your photos'}, {'name': 'photo', 'description': 'your photos'}]
          }]
    }
  ];

  public expiry: String = '';
  public timeNow: Number = Date.now();

  constructor(  private dialogSvc: DialogService,
                private dataOfferSvc: DataOfferService) { }

  ngOnInit() {

    const self = this;

    this.offersSub = this.dataOfferSvc.fetchUserAwareOfferList().subscribe(offers => {
      this.offers = offers.filter(function(offer) {
          return (  offer.claim.status === 'untouched'
                    && (offer.requiredMaxUser - offer.totalUserClaims) > 0
                    && offer.expires > Date.now()
                  )
      });

      self.setOfferImage();
    },
    error => { console.log(error); });

    this.setOfferImage();
  }


  setOfferImage() {
    for (let i = 0; i < this.offers.length; i++) {

      if (this.offers[i].illustrationUrl === '') {
        const offerType = this.offers[i].reward.rewardType.toLowerCase();

        if ( offerType === 'cash' ) {
          this.offers[i].illustrationUrl = 'assets/images/coin-icon.svg';
        } else if ( offerType === 'voucher' ) {
          this.offers[i].illustrationUrl = 'assets/images/voucher-icon.svg';
        } else if ( offerType === 'service' ) {
          this.offers[i].illustrationUrl = 'assets/images/badge-icon.svg';
        }

      }

      console.log(this.offers[i].illustrationUrl);
    }
  }


  showModal(offerIndex) {
    this.dialogSvc.createDialog<OfferModalComponent>(OfferModalComponent, {
      offer_index: offerIndex,
      offers: this.offers
    });
  }


}
