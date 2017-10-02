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
  public sleep: any;

  constructor() { }

  ngOnInit() {
    this.sleep = moment(this.fitbitData.sleep).format('h[ hrs,] m[ min]');
  }

}
