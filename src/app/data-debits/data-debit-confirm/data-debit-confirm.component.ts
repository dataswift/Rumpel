import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
// import { DomSanitizer } from '@angular/platform-browser';
import { UserService, HatApiService } from '../../services/index';
import { DataDebitService } from '../data-debits.service';
import { DataDebit, User } from '../../shared/interfaces/index';
import { isUndefined } from "util";

@Component({
  selector: 'rump-data-debit-confirm',
  templateUrl: 'data-debit-confirm.component.html',
  styleUrls: ['data-debit-confirm.component.scss']
})
export class DataDebitConfirmComponent implements OnInit, OnDestroy {
  private offer: any;
  private status: any;
  private userSub: Subscription;
  private dataDebit: DataDebit;
  private token: string;
  private uuid: string;
  private ddConfirmed: boolean;
  private offerSatisfied: boolean;
  private confirmMessage: boolean;

  constructor(private _route: ActivatedRoute,
              private _ddSvc: DataDebitService,
              private _hat: HatApiService,
              private _userSvc: UserService,
              private router: Router) {}

  ngOnInit() {
    this.status = '';
    this.uuid = this._route.snapshot.params['uuid'];
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

    this.userSub = this._userSvc.user$.subscribe((user: User) => {
      if (user.authenticated === true) {
        this.updateDataDebitInformation();
        this.updateOfferInformation(false);
      }
    });

    this._userSvc.isAuthenticated();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
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
      let offer = results[0].filter(offer => offer.offer.uuid === results[1])[0];
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
