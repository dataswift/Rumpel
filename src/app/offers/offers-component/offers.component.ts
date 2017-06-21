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
      title: 'batman',
      illustrationUrl: 'assets/icons/facebook-plug.svg',
      expires: 1527116400000,
      shortDescription: 'hello jon',
      pii: true,
      collectFor: 259200000,
      requiredMaxUser: 1000,
      totalUserClaims: 587,
      requiredDataDefinition:
          [{
            'source': 'Facebook',
            'datasets': [{'name': 'photo', 'description': 'your photos'}, {'name': 'photo', 'description': 'your photos'}]
          }]
    },
    {
      id: '456',
      title: 'robin',
      illustrationUrl: 'assets/icons/twitter-plug.svg',
      expires: 1497889035000,
      shortDescription: 'hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon',
      pii: false,
      collectFor: 691200000,
      requiredMaxUser: 100,
      totalUserClaims: 100,
      requiredDataDefinition:
          [{
            'source': 'Twitter',
            'datasets': [{'name': 'title', 'description': 'body'}, {'name': 'photo', 'description': 'your photos'}]
          }]
    },
    {
      id: '783', title: 'robin',
      illustrationUrl: 'assets/icons/twitter-plug.svg',
      expires: 1327116400000,
      shortDescription: 'hello jon',
      pii: true,
      collectFor: 86400000,
      requiredMaxUser: 10,
      totalUserClaims: 1,
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
    this.offersSub = this.dataOfferSvc.fetchUserAwareOfferList().subscribe(offers => {
      this.offers = offers.filter(function(offer) {
          return (  offer.claim.status === 'untouched'
                    && (offer.requiredMaxUser - offer.totalUserClaims) > 0
                    && offer.expires > Date.now()
                  )
      });
    },
    error => { console.log(error); });

  }


  showModal(offerIndex) {
    this.dialogSvc.createDialog<OfferModalComponent>(OfferModalComponent, {
      offer_index: offerIndex,
      offers: this.offers
    });
  }


}
