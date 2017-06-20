import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { DialogService } from '../../layout/dialog.service';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';

@Component({
  selector: 'rump-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})


export class OffersComponent implements OnInit {


  public offers: any = [{title: 'batman', illustrationUrl: 'assets/icons/facebook-plug.svg', 'expires': 1527116400000, shortDescription: 'hello jon', requiredDataDefinition: [{'source': 'Facebook', 'datasets': [{'name': 'photo', 'description': 'your photos'},{'name': 'photo', 'description': 'your photos'}]}]},
                        {title: 'robin', illustrationUrl: 'assets/icons/twitter-plug.svg', 'expires': 1497889035000, shortDescription: 'hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon hello jon', requiredDataDefinition: [{'source': 'Facebook', 'datasets': [{'name': 'photo', 'description': 'your photos'},{'name': 'photo', 'description': 'your photos'}]}]},
                      {title: 'robin', illustrationUrl: 'assets/icons/twitter-plug.svg', 'expires': 1327116400000, shortDescription: 'hello jon', requiredDataDefinition: [{'source': 'Facebook', 'datasets': [{'name': 'photo', 'description': 'your photos'},{'name': 'photo', 'description': 'your photos'}]}]},]

  public expiry: String = '';
  public timeNow: Number = Date.now();

  constructor(  private dialogSvc: DialogService ) { }

  ngOnInit() {
  }


  showModal(offerIndex) {
    this.dialogSvc.createDialog<OfferModalComponent>(OfferModalComponent, {
      offer_index: offerIndex,
      offers: this.offers
    });
  }


}
