import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rum-monzo-my-day',
  templateUrl: './monzo-my-day.component.html',
  styleUrls: ['./monzo-my-day.component.scss']
})
export class MonzoMyDayComponent implements OnInit {

  @Input() monzoData: { spend_today: number; balance: number; currency: string; };

  constructor() { }

  ngOnInit() {
  }

}
