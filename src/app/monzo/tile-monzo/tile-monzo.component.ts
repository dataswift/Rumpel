import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MonzoService } from '../monzo.service';

import { Monzo } from '../monzo.interface';
import * as moment from 'moment';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';

@Component({
  selector: 'rump-tile-monzo',
  templateUrl: './tile-monzo.component.html',
  styleUrls: ['./tile-monzo.component.scss']
})
export class TileMonzoComponent implements OnInit, OnDestroy {

  private monzoSub: Subscription;
  public monzos: HatRecord<Monzo>[];
  public todaySpend = 0;
  public monthSpend = 0;

  constructor( private monzoSvc: MonzoService ) { }

  ngOnInit() {
      this.monzoSub = this.monzoSvc.data$.subscribe((monzos: HatRecord<Monzo>[]) => {
        this.monzos = monzos;
        this.monzos
            .filter( monzo => monzo.data.dateTime.isSame(moment(), 'month') )
            .forEach( monzo => this.monthSpend += Number(monzo.data.spend_today) );
        this.monzos
            .filter( monzo => monzo.data.dateTime.isSame(moment(), 'day') )
            .forEach( monzo => this.todaySpend = Number(monzo.data.spend_today) );
      });

  }

  ngOnDestroy() {
    this.monzoSub.unsubscribe();
  }

}
