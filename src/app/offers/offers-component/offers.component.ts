import { Component, OnInit, Input } from '@angular/core';

import { DialogService } from '../../core/dialog.service';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';
import { InfoBoxComponent } from '../../core/info-box/info-box.component';

@Component({
  selector: 'rum-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})

export class OffersComponent implements OnInit {
  @Input() offers: any = [];
  @Input() acceptedOffers: any = [];
  @Input() noOffersMessage = '';

  public expiry: String = '';
  public timeNow: Number = Date.now();

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showModal(offerIndex) {
    this.dialogSvc.createDialog<OfferModalComponent>(OfferModalComponent, {
      offer_index: offerIndex,
      offers: this.offers
    });
  }

  showInfobox() {
    this.dialogSvc.createDialog<InfoBoxComponent>(InfoBoxComponent, {
      title: 'Trade your data for cash, services or vouchers',
      message: `The offers you see on this page are tailored to you, based on the data you have chosen to share.<br><br>
      You can unlock more offers by connecting more data plugs and entering your personal data.`
    });
  }


}
