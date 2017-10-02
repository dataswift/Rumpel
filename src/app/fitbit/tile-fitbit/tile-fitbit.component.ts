import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as moment from 'moment';
import { Moment } from 'moment';

import { Fitbit } from '../fitbit.interface';
import { MockFitbitData } from '../mock-data';

import { FitbitService } from '../fitbit.service';

@Component({
  selector: 'rump-tile-fitbit',
  templateUrl: './tile-fitbit.component.html',
  styleUrls: ['./tile-fitbit.component.scss']
})
export class TileFitbitComponent implements OnInit, OnDestroy {

  private fitbitSub: Subscription;
  private fitbits: Fitbit[];
  public todaySteps = 0;
  public todayHeart = 0;
  public todaySleep = '0 hrs, 0 min';

  constructor( private fitbitSvc: FitbitService ) { }

  ngOnInit() {
      this.fitbitSub = this.fitbitSvc.data$.subscribe((fitbits: Array<Fitbit>) => {
        this.fitbits = fitbits;
        this.fitbits
            .filter( fitbit => moment(fitbit.dateTime).isSame(moment(), 'day') )
            .forEach( fitbit => {
            this.todaySteps = fitbit.steps;
            this.todayHeart = fitbit.restingHeartRate;
            this.todaySleep = moment(fitbit.sleep).format('h[ hrs,] m[ min]')
            })
      });
  }

  ngOnDestroy() {
    this.fitbitSub.unsubscribe();
  }

}
