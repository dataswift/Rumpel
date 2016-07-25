import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDebitService, HatApiService } from '../../services';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-data-debit-confirm',
  templateUrl: 'data-debit-confirm.component.html',
  styleUrls: ['data-debit-confirm.component.css'],
  pipes: [Moment]
})
export class DataDebitConfirmComponent implements OnInit {
  public offerInfo;
  public dataDebit;
  private _uuid: string;

  constructor(private _route: ActivatedRoute,
              private _ddSvc: DataDebitService,
              private _hat: HatApiService,
              private router: Router) {}

  ngOnInit() {
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

    this._route.params.subscribe(params => {
      let uuid = params['uuid'];
      this._uuid = uuid;
      this._ddSvc.loadOffer(this._uuid).subscribe(info => {
        this.offerInfo = info[0];
      });
    });
  }

  acceptDataDebit() {
    this._hat.updateDataDebit(this._uuid, 'enable').subscribe(res => this.router.navigate(['']));
  }

  rejectDataDebit() {
    this._hat.updateDataDebit(this._uuid, 'disable').subscribe(res => this.router.navigate(['']));
  }

}
