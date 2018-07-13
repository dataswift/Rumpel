import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FitbitActivitySummaryService } from '../services/fitbit-activity-summary.service';

import { FitbitActivitySummary } from '../interfaces/fitbit-activity-summary.interface';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import * as moment from 'moment';

@Component({
  selector: 'rum-tile-fitbit',
  templateUrl: './tile-fitbit.component.html',
  styleUrls: ['./tile-fitbit.component.scss']
})
export class TileFitbitComponent implements OnInit, OnDestroy {

  private fitbitSub: Subscription;
  private fitbits: HatRecord<FitbitActivitySummary>[];
  public todaySteps = 0;
  public todayHeart = 0;
  public todaySleep = '0 hrs, 0 min';

  constructor(private fitbitSvc: FitbitActivitySummaryService) { }

  ngOnInit() {
      this.fitbitSub = this.fitbitSvc.data$.subscribe((fitbits: HatRecord<FitbitActivitySummary>[]) => {
        fitbits.forEach(fitbit => {
          this.todaySteps = fitbit.data.steps;
          this.todayHeart = fitbit.data.steps;
          this.todaySleep = moment(fitbit.data.steps).format('h[ hrs,] m[ min]')
        });
      });
  }

  ngOnDestroy() {
    this.fitbitSub.unsubscribe();
  }

}
