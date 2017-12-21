import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DataOfferService } from '../data-offer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rum-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})

export class OfferModalComponent implements OnInit {
  @Input() offer_index: number;
  @Input() offers: any;

  @Input() changeModal: Function;
  @Input() statsComponent: any;
  @Input() offerMode = 'untouched';

  @ViewChild('modalBody') modalBody: ElementRef;
  @ViewChild('offerControlButton') offerButton: ElementRef;

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
  public termsAccepted = false;

  constructor(private renderer: Renderer2,
              private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    this.scrollTop = document.body.scrollTop;
    this.renderer.addClass(document.body, 'no-scroll');

    this.changeOffer(0);
    this.animateIn = true;
  }

  closeModal(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
    document.body.scrollTop = this.scrollTop;

    this.animateIn = false;
    setTimeout(() => {
      this.destroy();
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
    this.btnText = 'Accept';

    if (this.offers[this.offer_index].claim === undefined) {
      this.offerStatus = 'untouched';
    } else {
      this.offerStatus = this.offers[this.offer_index].claim.status;
    }

    this.renderer.removeClass(this.offerButton, 'processing accepted failed');
    this.termsAccepted = false;
    this.modalBody.nativeElement.scrollTop = 0;
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
    setTimeout(() => {
      if (this.offerMode === 'untouched') {
          this.offers = offers.filter(function(offer) {

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
          this.offers = offers.filter(function(offer) {

              let claimStatus = 'untouched';
              if (offer.claim && offer.claim.status) {
                claimStatus = offer.claim.status;
              }

              return (  claimStatus !== 'untouched' &&
                        claimStatus !== 'rejected'
                      )
          });
      }

      if (this.offer_index === this.offers.length) {
        this.changeOffer(-1);
      } else {
        this.changeOffer(0);
      }

    }, 3000);
  }

  updateClaimDisabled(evt) {
    this.claimDisabled = !evt.target.checked;
    this.termsAccepted = !this.termsAccepted;
  }

  showUserFeedback(btn, feedback) {

    this.btnText = feedback;
    btn.classList.remove('processing', 'accepted', 'failed');

    if (feedback !== 'Accept' && feedback !== 'Try again') {
      btn.classList.add( feedback.toLowerCase() );
    }


      if (feedback === 'Processing') {
        this.btnIcon = 'autorenew';
      } else if (feedback === 'Accepted') {
        this.btnIcon = 'check_circle';
      } else if (feedback === 'Accept' || feedback === 'Try again') {
        this.btnIcon = '';
      } else if (feedback === 'Failed') {
        this.btnIcon = 'report_problem';
        setTimeout(() => {
          this.showUserFeedback(btn, 'Accept');
        }, 5000);
      }


  }


  claimReward(type) {
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

  canDisplayOldDataRequirements(): boolean {
    return Array.isArray(this.offers[this.offer_index].requiredDataDefinition);
  }

  objectToArray(object): Array<any> {
    return Object.keys(object).map(key => object[key]);
  }


}
