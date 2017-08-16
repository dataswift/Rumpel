import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Monzo } from '../monzo.interface';
import { MockMonzoData } from '../mock-data';

import * as moment from 'moment';
import { Moment } from 'moment';

import { MonzoService } from '../monzo.service';

@Component({
  selector: 'rump-tile-monzo',
  templateUrl: './tile-monzo.component.html',
  styleUrls: ['./tile-monzo.component.scss']
})
export class TileMonzoComponent implements OnInit, OnDestroy {

  private monzoSub: Subscription;
  public monzos: Monzo[];
  public todaySpend = 0;
  public monthSpend = 0;

  constructor( private monzoSvc: MonzoService ) { }

  ngOnInit() {
      this.monzoSub = this.monzoSvc.data$.subscribe((monzos: Array<Monzo>) => {
        this.monzos = monzos;
        this.monzos
            .filter( monzo => moment(monzo.dateTime).isSame(moment(), 'month') )
            .forEach( monzo => this.monthSpend += Number(monzo.spend_today) );
        this.monzos
            .filter( monzo => moment(monzo.dateTime).isSame(moment(), 'day') )
            .forEach( monzo => this.todaySpend = Number(monzo.spend_today) );
      });

  }

  ngOnDestroy() {
    this.monzoSub.unsubscribe();
  }

}
