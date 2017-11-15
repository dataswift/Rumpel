import { Component, OnInit, Input } from '@angular/core';
import { FitbitActivitySummary } from '../interfaces/fitbit-activity-summary.interface';
import * as moment from 'moment';

@Component({
  selector: 'rump-fitbit-my-day',
  templateUrl: './fitbit-my-day.component.html',
  styleUrls: ['./fitbit-my-day.component.scss']
})
export class FitbitMyDayComponent implements OnInit {

  @Input() fitbitData: FitbitActivitySummary;
  public sleep: any;

  constructor() { }

  ngOnInit() {
    this.sleep = moment(this.fitbitData.steps).format('h[ hrs,] m[ min]');
  }

}
