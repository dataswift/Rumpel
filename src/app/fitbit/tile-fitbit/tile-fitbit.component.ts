import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FitbitService } from '../fitbit.service';
import { Fitbit } from '../fitbit.interface';
import * as moment from 'moment';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';

@Component({
  selector: 'rump-tile-fitbit',
  templateUrl: './tile-fitbit.component.html',
  styleUrls: ['./tile-fitbit.component.scss']
})
export class TileFitbitComponent implements OnInit, OnDestroy {

  private fitbitSub: Subscription;
  private fitbits: HatRecord<Fitbit>[];
  public todaySteps = 0;
  public todayHeart = 0;
  public todaySleep = '0 hrs, 0 min';

  constructor( private fitbitSvc: FitbitService ) { }

  ngOnInit() {
      this.fitbitSub = this.fitbitSvc.data$.subscribe((fitbits: HatRecord<Fitbit>[]) => {
        this.fitbits = fitbits;
        this.fitbits
            .filter(fitbit => fitbit.data.dateTime.isSame(moment(), 'day'))
            .forEach( fitbit => {
            this.todaySteps = fitbit.data.steps;
            this.todayHeart = fitbit.data.restingHeartRate;
            this.todaySleep = moment(fitbit.data.sleep).format('h[ hrs,] m[ min]')
            })
      });
  }

  ngOnDestroy() {
    this.fitbitSub.unsubscribe();
  }

}
