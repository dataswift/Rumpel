import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FitbitService } from '../fitbit.service';

import { FitbitActivitySummary } from '../fitbit.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import * as moment from 'moment';

@Component({
  selector: 'rump-tile-fitbit',
  templateUrl: './tile-fitbit.component.html',
  styleUrls: ['./tile-fitbit.component.scss']
})
export class TileFitbitComponent implements OnInit, OnDestroy {

  private fitbitSub: Subscription;
  private fitbits: HatRecord<FitbitActivitySummary>[];
  public todaySteps = 0;
  public todayHeart = 0;
  public todaySleep = '0 hrs, 0 min';

  constructor( private fitbitSvc: FitbitService ) { }

  ngOnInit() {
      this.fitbitSub = this.fitbitSvc.data$.subscribe((fitbits: HatRecord<FitbitActivitySummary>[]) => {
        this.fitbits
            .forEach( fitbit => {
            this.todaySteps = fitbit.data.steps;
            this.todayHeart = fitbit.data.steps;
            this.todaySleep = moment(fitbit.data.steps).format('h[ hrs,] m[ min]')
            })
      });
  }

  ngOnDestroy() {
    this.fitbitSub.unsubscribe();
  }

}
