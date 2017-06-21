import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DataOfferService } from '../../data-management/data-offer.service';
import {Subscription, Observable} from 'rxjs/Rx';

declare var $: any;

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
  public claimSub: Subscription;
  private destroy: Function;
  public claimDisabled = true;
  public userFeedbackShowing = false;
  public scrollTop: number;

  constructor(private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    this.scrollTop = $('body').scrollTop();
    $('body, html').addClass('no-scroll');
  }

  closeModal(): void {
    $('body, html').removeClass('no-scroll');
    $('body').scrollTop(this.scrollTop);
    this.destroy();
  }

  prevOffer(): void {
    if (this.offer_index > 0 ) {
      this.offer_index = this.offer_index - 1;
      this.claimDisabled = true;
      this.userFeedbackShowing = false;
    }
  }

  nextOffer(): void {
    if (this.offers.length > (this.offer_index + 1) ) {
      this.offer_index = this.offer_index + 1;
      this.claimDisabled = true;
      this.userFeedbackShowing = false;
    }
  }

  acceptOffer(): void {
    this.showUserFeedback();

    this.claimSub = this.dataOfferSvc.claim(this.offers[this.offer_index].id).subscribe(offers => {
        this.offers = offers;
        console.log('claim success');
        this.closeModal();
      },
      error => { console.log('claim failed', error); }
    );

  }

  updateClaimDisabled(evt) {
    this.claimDisabled = !evt.target.checked;
  }

  showUserFeedback() {
    this.userFeedbackShowing = true;
    $('.rump-modal-body').animate({'scrollTop': '0px'}, 300);
  }

}
