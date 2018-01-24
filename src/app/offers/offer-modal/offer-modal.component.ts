import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DataOfferService } from '../data-offer.service';
import { Subscription } from 'rxjs/Subscription';
import { OffersStorage } from '../offer.interface';

const BTN_TEXT = {
  untouched: 'Accept',
  processing: 'Processing',
  accepted: 'Accepted',
  failed: 'Failed',
  tryAgain: 'Try Again'
};

const BTN_ICON = {
  untouched: '',
  processing: 'autorenew',
  accepted: 'check_circle',
  failed: 'report_problem',
  tryAgain: ''
};

@Component({
  selector: 'rum-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {
  @Input() offer_index: number;
  @Input() offerGroup: 'availableOffers' | 'acceptedOffers';

  @Input() changeModal: Function;
  @Input() statsComponent: any;
  @Input() offerMode = 'untouched';

  @ViewChild('modalBody') modalBody: ElementRef;
  @ViewChild('offerControlButton') offerButton: ElementRef;

  public offers = [];
  public timeNow = Date.now();
  public claimSub: Subscription;
  private destroy: Function;
  public claimDisabled = true;
  public scrollTop: number;
  public offerDuration: number;
  public scrollShadow = false;
  public navDisabled = false;
  public offerStatus = 'untouched';
  public animateIn = false;
  public voucherCopied = false;
  public termsAccepted = false;
  public offerUiState: 'untouched' | 'processing' | 'accepted' | 'failed' | 'tryAgain';

  constructor(private renderer: Renderer2,
              private dataOfferSvc: DataOfferService) { }

  ngOnInit() {
    this.scrollTop = document.body.scrollTop;
    this.renderer.addClass(document.body, 'no-scroll');

    // this.changeOffer(0);
    this.animateIn = true;

    this.dataOfferSvc.offers$.subscribe((offers: OffersStorage) => {
      this.updateOffers(offers[this.offerGroup]);
      this.changeOffer(0);
    });
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
    if (this.offers.length > (this.offer_index + 1)) {
      this.changeOffer(1);
    }
  }

  changeOffer(diff: number) {
    this.offer_index = this.offer_index + diff;
    this.offerDuration = this.offers.length > 0 ? this.offers[this.offer_index].collectFor : null;

    this.claimDisabled = true;
    this.scrollShadow = false;
    this.navDisabled = false;
    this.offerUiState = 'untouched';

    if (this.offers.length > 0) {
      if (this.offers[this.offer_index].claim === undefined) {
        this.offerStatus = 'untouched';
      } else {
        this.offerStatus = this.offers[this.offer_index].claim.status;
      }
    }

    this.termsAccepted = false;
    this.modalBody.nativeElement.scrollTop = 0;
  }

  acceptOffer(evt): void {
    this.navDisabled = true;

    if (this.offerUiState === 'untouched' || this.offerUiState === 'failed') {
      this.offerUiState = 'processing';

      this.claimSub = this.dataOfferSvc.claim(this.offers[this.offer_index].id).subscribe(_ => {
          this.navDisabled = false;
          this.offerUiState = 'accepted';
        },
        error => {
          // console.log('claim failed', error);
          this.navDisabled = false;
          this.offerUiState = 'failed';
          setTimeout(() => {
            this.offerUiState = 'tryAgain';
          }, 5000);
        }
      );
    }
  }

  updateOffers(offers) {
    if (this.offerGroup === 'availableOffers') {
      this.offers = offers;
    } else {
      this.offers = offers;
    }

    // if (this.offerMode === 'untouched') {
    //   this.offers = offers.filter(function(offer) {
    //     let claimStatus = 'untouched';
    //     if (offer.claim && offer.claim.status) {
    //       claimStatus = offer.claim.status;
    //     }
    //
    //     let moreUsersRequired = false;
    //     if (offer.requiredMaxUser === 0) {
    //       moreUsersRequired = true;
    //     } else {
    //       moreUsersRequired = (offer.requiredMaxUser - offer.totalUserClaims) > 0;
    //     }
    //
    //     return claimStatus === 'untouched' && moreUsersRequired && offer.expires > Date.now();
    //   });
    // } else {
    //   this.offers = offers.filter(offer => {
    //     let claimStatus = 'untouched';
    //     if (offer.claim && offer.claim.status) {
    //       claimStatus = offer.claim.status;
    //     }
    //
    //     return claimStatus !== 'untouched' && claimStatus !== 'rejected';
    //   });
    // }

    if (this.offer_index === this.offers.length) {
      this.changeOffer(-1);
    } else {
      this.changeOffer(0);
    }
  }

  updateClaimDisabled(evt) {
    this.claimDisabled = !evt.target.checked;
    this.termsAccepted = !this.termsAccepted;
  }

  claimReward(type) {
     if (type === 'cash') {
       this.statsComponent.showConfirmBox();
     } else {
       const serviceLink = this.offers[this.offer_index].reward.vendorUrl;
       window.open(serviceLink, '_blank');
     }
  }

  // handleScroll(evt) {
    // this.scrollShadow = evt.target.scrollTop > 0;
  // }

  canDisplayOldDataRequirements(): boolean {
    return Array.isArray(this.offers[this.offer_index].requiredDataDefinition);
  }

  objectToArray(object): Array<any> {
    return Object.keys(object).map(key => object[key]);
  }

  btnText(): string {
    return BTN_TEXT[this.offerUiState];
  }

  btnIcon(): string {
    return BTN_ICON[this.offerUiState];
  }
}
