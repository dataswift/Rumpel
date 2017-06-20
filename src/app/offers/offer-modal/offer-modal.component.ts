import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rump-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {
  @Input() offer_index: number;
  @Input() offers: any;

  @Input() changeModal: Function;

  public timeNow = Date.now();

  private destroy: Function;

  constructor() { }

  ngOnInit() {
    console.log( this.offers[this.offer_index] );
  }

  closeModal(): void {
    this.destroy();
  }

  prevOffer(): void {
    if(this.offer_index > 0 ) {
      this.offer_index = this.offer_index - 1;
    }
  }

  nextOffer(): void {
    if(this.offers.length > (this.offer_index + 1) ) {
      this.offer_index = this.offer_index + 1;
    }
  }

  acceptOffer(): void {
    this.closeModal();
  }

}
