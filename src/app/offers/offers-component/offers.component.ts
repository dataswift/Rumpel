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
      id: '123',
      title: 'batman',
      illustrationUrl: 'assets/icons/facebook-plug.svg',
      expires: 1527116400000,
      shortDescription: 'hello jon',
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
          return offer.claim.status === 'untouched'
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
