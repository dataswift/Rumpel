import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'rum-fitbit-my-day',
  templateUrl: './fitbit-my-day.component.html',
  styleUrls: ['./fitbit-my-day.component.scss']
})
export class FitbitMyDayComponent implements OnInit {

  @Input() fitbitData: { steps: number };
  public sleep: any;

  constructor() { }

  ngOnInit() {
    this.sleep = moment(this.fitbitData.steps).format('h[ hrs,] m[ min]');
  }

}
