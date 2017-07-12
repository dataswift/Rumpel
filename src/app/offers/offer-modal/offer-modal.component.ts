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
  @Input() statsComponent: any;

  public timeNow = Date.now();
  public claimSub: Subscription;
  private destroy: Function;
  public claimDisabled = true;
  public scrollTop: number;
  public offerDuration: number;
  public scrollShadow = false;
  public btnIcon = '';
  public btnText = 'Accept';
  public navDisabled = false;
  public offerStatus = 'untouched';
  public remove = false;

  constructor(private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    this.scrollTop = $('body').scrollTop();
    $('body, html').addClass('no-scroll');

    this.changeOffer(0);
  }

  closeModal(): void {
    $('body, html').removeClass('no-scroll');
    $('body').scrollTop(this.scrollTop);

    const self = this;
    this.remove = true;
    setTimeout(function(){
      self.destroy();
    }, 1000);
  }


  prevOffer(): void {
    if (this.offer_index > 0 ) {
      this.changeOffer(-1);
    }
  }

  nextOffer(): void {
    if (this.offers.length > (this.offer_index + 1) ) {
      this.changeOffer(1);
    }
  }

  changeOffer(diff: number) {
    this.offer_index = this.offer_index + diff;
    this.offerDuration = moment.duration( this.offers[this.offer_index].collectFor ).as('days');

    this.claimDisabled = true;
    this.scrollShadow = false;
    this.navDisabled = false;
    this.btnIcon = '';
    this.btnText = 'Accept'

    if (this.offers[this.offer_index].claim === undefined) {
      this.offerStatus = 'untouched';
    } else {
      this.offerStatus = this.offers[this.offer_index].claim.status;
    }

    $('.rump-modal-footer .btn').removeClass('processing accepted failed');
    $('.regular-checkbox').attr('checked', false);
    $('.rump-modal-body').scrollTop(0);
  }

  acceptOffer(evt): void {

    this.navDisabled = true;

    if (this.btnText === 'Accept' || this.btnText === 'Try again') {
        this.showUserFeedback(evt.target, 'Processing');

        this.claimSub = this.dataOfferSvc.claim(this.offers[this.offer_index].id).subscribe(offers => {
            this.offers = offers;
            this.dataOfferSvc.fetchUserAwareOfferListSubscription();
            this.navDisabled = false;
            this.showUserFeedback(evt.target, 'Accepted');
          },
          error => {
            console.log('claim failed', error);
            this.navDisabled = false;
            this.showUserFeedback(evt.target, 'Failed');
          }
        );
    }
  }

  updateClaimDisabled(evt) {
    this.claimDisabled = !evt.target.checked;
  }

  showUserFeedback(btn, feedback) {

    this.btnText = feedback;
    btn.classList.remove('processing', 'accepted', 'failed');

    if (feedback !== 'Accept' && feedback !== 'Try again') {
      btn.classList.add( feedback.toLowerCase() );
    }


    const self = this;

      if (feedback === 'Processing') {
        this.btnIcon = 'autorenew';
      } else if (feedback === 'Accepted') {
        this.btnIcon = 'check_circle';
      } else if (feedback === 'Accept' || feedback === 'Try again') {
        this.btnIcon = '';
      } else if (feedback === 'Failed') {
        this.btnIcon = 'report_problem';
        setTimeout(function(){
          self.showUserFeedback(btn, 'Accept');
        }, 5000);
      }


  }


  claimReward (type) {
     if (type === 'cash') {
       this.statsComponent.showConfirmBox();
     } else if (type === 'voucher') {
       // console.log('voucher');
     } else if (type === 'service') {
       // console.log('service');
     }
  }


  handleScroll(evt) {
    if (evt.target.scrollTop > 0) {
      this.scrollShadow = true;
    } else {
      this.scrollShadow = false;
    }
  }

}
