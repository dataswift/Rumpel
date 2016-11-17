import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HatApiService } from '../../services';
import { DataDebitService } from '../data-debits.service';
import { DataDebit } from '../../shared/interfaces';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { isUndefined } from "util";

@Component({
  selector: 'rump-data-debit-confirm',
  templateUrl: 'data-debit-confirm.component.html',
  styleUrls: ['data-debit-confirm.component.scss']
})
export class DataDebitConfirmComponent implements OnInit {
  private offer: any;
  private status: any;
  private dataDebit: DataDebit;
  private token: string;
  private uuid: string;
  private ddConfirmed: boolean;
  private offerSatisfied: boolean;
  private confirmMessage: boolean;
  private facebookShareLink: string;
  private twitterShareLink: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private _route: ActivatedRoute,
              private _ddSvc: DataDebitService,
              private _hat: HatApiService,
              private authSvc: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.status = '';
    this.offer = {
      offer: {
        title: '',
        description: '',
        starts: '',
        expires: '',
        dataRequest: { definition: [] },
        reward: { vendor: '', rewardType: '', value: '' }
      },
      owner: { firstName: '', lastName: '', email: '' }
    };

    this.authSvc.auth$.subscribe(isAuthenticated => {
      if (isAuthenticated === false) return;

      this.updateDataDebitInformation();
      this.updateOfferInformation(false);
    });

    this._route.params.subscribe(params => {
      this.uuid = params['uuid'] || null;
    });

    this._route.queryParams.subscribe(params => {
      if (this.authSvc.isAuthenticated() === true) {
        this.updateDataDebitInformation();
        this.updateOfferInformation(false);
      } else {
        let jwtToken = params['token'] || null;
        return this.authSvc.authenticate(jwtToken);
      }
    });
  }

  acceptDataDebit() {
    this._hat.updateDataDebit(this.uuid, 'enable').subscribe(res => {
      this.confirmMessage = true;
      this.ddConfirmed = true;
      this.updateOfferInformation(true);
    });
  }

  rejectDataDebit() {
    this.router.navigate(['']);
    // this._hat.updateDataDebit(this.uuid, 'disable').subscribe(res => this.router.navigate(['']));
  }

  navigateToRewardClaim() {
    window.location.href = 'https://marketsquare.hubofallthings.com/offers/' + this.offer.offer.uuid;
  }

  // getBackgroundPicture() {
  //   return this.sanitizer.bypassSecurityTrustStyle('url(' + this.offer.offer.illustrationUrl + ')');
  // }

  private updateOfferInformation(forceReload: boolean) {
    this._ddSvc.getDataOffer(this.uuid, forceReload).subscribe(results => {
      console.log(results);
      let offer = results[0].find(offer => offer.offer.uuid === results[1]);
      this.facebookShareLink = this.config.facebook.shareUrl +
        'https://marketsquare.hubofallthings.com/offers/' + results[1];
      this.twitterShareLink = this.config.twitter.shareUrl +
        'https://marketsquare.hubofallthings.com/offers/' + results[1];
      this.offerSatisfied = offer.offer.status === 'satisfied' ? true : false;
      this.offer = offer;
      this.updateStatus();
    });
  }

  private updateDataDebitInformation() {
    this._ddSvc.loadDataDebit(this.uuid).subscribe(debitInfo => {
      this.ddConfirmed = debitInfo.enabled || false;
      this.dataDebit = debitInfo;
      this.updateStatus();
    });
  }

  private updateStatus() {
    if (isUndefined(this.ddConfirmed) || isUndefined(this.offerSatisfied)) {
      return;
    } else if (this.ddConfirmed === false) {
      this.status = 'pending';
    } else if (this.offerSatisfied === false) {
      this.status = 'accepted';
    } else if (this.offerSatisfied === true) {
      this.status = 'satisfied';
    }
  }
}
