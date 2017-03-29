/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { HatApiService, UserService } from '../../services/index';
import { DataDebitService } from '../data-debits.service';
import { DataDebit } from '../../shared/interfaces';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { isUndefined } from 'util';

@Component({
  selector: 'rump-data-debit-confirm',
  templateUrl: 'data-debit-confirm.component.html',
  styleUrls: ['data-debit-confirm.component.scss']
})
export class DataDebitConfirmComponent implements OnInit, OnDestroy {
  public offer: any;
  public status: any;
  private userSub: Subscription;
  public dataDebit: DataDebit;
  private uuid: string;
  private ddConfirmed: boolean;
  private offerSatisfied: boolean;
  public confirmMessage: boolean;
  public facebookShareLink: string;
  public twitterShareLink: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private _route: ActivatedRoute,
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

    this.userSub = this._userSvc.auth$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.updateDataDebitInformation();
        this.updateOfferInformation(false);
      }
    });

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
      // console.log(results);
      const offerMatchedToDataDebit = results[0].find(offer => offer.offer.uuid === results[1]);
      this.facebookShareLink = this.config.facebook.shareUrl +
        'https://marketsquare.hubofallthings.com/offers/' + results[1];
      this.twitterShareLink = this.config.twitter.shareUrl +
        'https://marketsquare.hubofallthings.com/offers/' + results[1];
      this.offerSatisfied = offerMatchedToDataDebit.offer.status === 'satisfied';
      this.offer = offerMatchedToDataDebit;
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
