import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { DialogService } from '../../layout/dialog.service';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';
import { InfoBoxComponent } from '../../layout/info-box/info-box.component';
import { OfferAcceptedStatsComponent } from '../offer-accepted-stats/offer-accepted-stats.component';

@Component({
  selector: 'rump-offers-accepted',
  templateUrl: './offers-accepted.component.html',
  styleUrls: ['./offers-accepted.component.scss']
})

export class OffersAcceptedComponent implements OnInit {

  @ViewChild(OfferAcceptedStatsComponent) statsComponent: OfferAcceptedStatsComponent;
  @Input() offers: any = [];
  @Input() acceptedOffers: any = [];
  @Input() noOffersMessage = '';

  public vouchersEarned = 0;
  public vouchersClaimed = 0;

  public servicesEarned = 0;
  public servicesClaimed = 0;

  public cashEarned = 0;
  public cashClaimed = 0;
  public cashFormat = '1.2-2';


  constructor( private dialogSvc: DialogService ) { }

  ngOnInit() {

  }


  showModal(offerIndex) {
    this.dialogSvc.createDialog<OfferModalComponent>(OfferModalComponent, {
      offer_index: offerIndex,
      offers: this.acceptedOffers,
      statsComponent: this.statsComponent
    });
  }



}
