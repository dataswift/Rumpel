import { Component, OnInit, Input } from '@angular/core';
import { Fitbit } from '../fitbit.interface';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rump-fitbit-my-day',
  templateUrl: './fitbit-my-day.component.html',
  styleUrls: ['./fitbit-my-day.component.scss']
})
export class FitbitMyDayComponent implements OnInit {

  @Input() fitbitData: Fitbit;
  private sleep: any;

  constructor() { }

  ngOnInit() {
    let sleepMoment = moment(this.fitbitData.sleep);
    this.sleep = sleepMoment.format('h[ hrs,] m[ min]');
  }

}
