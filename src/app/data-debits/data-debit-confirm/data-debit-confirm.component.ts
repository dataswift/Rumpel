import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HatApiService } from '../../services';
import { DataDebitService } from '../data-debits.service';
import { DataDebit } from '../../shared/interfaces';

@Component({
  selector: 'rump-data-debit-confirm',
  templateUrl: 'data-debit-confirm.component.html',
  styleUrls: ['data-debit-confirm.component.scss']
})
export class DataDebitConfirmComponent implements OnInit {
  public offerInfo;
  public dataDebit: DataDebit;
  private token: string;
  private uuid: string;
  public ddConfirmed: boolean;

  constructor(private _route: ActivatedRoute,
              private _ddSvc: DataDebitService,
              private _hat: HatApiService,
              private authSvc: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.ddConfirmed = false;
    this.offerInfo = {
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

      // this._ddSvc.loadOffer(this.uuid).subscribe(info => {
      //   console.log('LOADED OFFER', info);
      //   this.offerInfo = info[0];
      // });

      this._ddSvc.loadDataDebit(this.uuid).subscribe(debitInfo => {
        this.ddConfirmed = debitInfo.enabled || false;
        this.dataDebit = debitInfo;
      });
    });

    this._route.params.subscribe(params => {
      this.uuid = params['uuid'] || null;
    });

    this._route.queryParams.subscribe(params => {
      if (this.authSvc.isAuthenticated() === true) {
        return this._ddSvc.loadDataDebit(this.uuid).subscribe(debitInfo => {
          this.ddConfirmed = debitInfo.enabled;
          this.dataDebit = debitInfo;
        });
      } else {
        let jwtToken = params['token'] || null;
        return this.authSvc.authenticate(jwtToken);
      }
    });
  }

  acceptDataDebit() {
    this._hat.updateDataDebit(this.uuid, 'enable').subscribe(res => this.router.navigate(['']));
  }

  rejectDataDebit() {
    this.router.navigate(['']);
    // this._hat.updateDataDebit(this.uuid, 'disable').subscribe(res => this.router.navigate(['']));
  }

}
