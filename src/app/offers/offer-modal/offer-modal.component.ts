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
  @Input() offerMode = 'untouched';

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
  public animateIn = false;
  public voucherCopied = false;

  constructor(private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    this.scrollTop = $('body').scrollTop();
    $('body, html').addClass('no-scroll');

    this.changeOffer(0);
    this.animateIn = true;
  }

  closeModal(): void {
    $('body, html').removeClass('no-scroll');
    $('body').scrollTop(this.scrollTop);

    const self = this;
    this.animateIn = false;
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
    this.offerDuration = this.offers[this.offer_index].collectFor;

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
            this.navDisabled = false;
            this.showUserFeedback(evt.target, 'Accepted');
            this.dataOfferSvc.fetchUserAwareOfferListSubscription();
            this.updateOffers(offers);
          },
          error => {
            console.log('claim failed', error);
            this.navDisabled = false;
            this.showUserFeedback(evt.target, 'Failed');
          }
        );
    }
  }


  updateOffers(offers) {
    const self = this;

    setTimeout(function(){
      if (self.offerMode === 'untouched') {
          self.offers = offers.filter(function(offer) {

              let claimStatus = 'untouched';
              if (offer.claim && offer.claim.status) {
                claimStatus = offer.claim.status;
              }

              let moreUsersRequired = false;
              if (offer.requiredMaxUser === 0) {
                moreUsersRequired = true;
              } else {
                moreUsersRequired = (offer.requiredMaxUser - offer.totalUserClaims) > 0;
              }

              return (  claimStatus === 'untouched' &&
                        moreUsersRequired &&
                        offer.expires > Date.now()
                      )
          });
      } else {
          self.offers = offers.filter(function(offer) {

              let claimStatus = 'untouched';
              if (offer.claim && offer.claim.status) {
                claimStatus = offer.claim.status;
              }
              return (  claimStatus !== 'untouched' &&
                        claimStatus !== 'rejected'
                      )
          });
      }

      if (self.offer_index === self.offers.length) {
        self.changeOffer(-1);
      } else {
        self.changeOffer(0);
      }

    }, 3000);
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
     } else {
       const serviceLink = this.offers[this.offer_index].reward.vendorUrl;
       window.open(serviceLink, '_blank');
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
