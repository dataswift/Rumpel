import { Component, OnInit, Input } from '@angular/core';
import { Monzo } from '../monzo.interface';

@Component({
  selector: 'rum-monzo-my-day',
  templateUrl: './monzo-my-day.component.html',
  styleUrls: ['./monzo-my-day.component.scss']
})
export class MonzoMyDayComponent implements OnInit {

  @Input() monzoData: Monzo;

  constructor() { }

  ngOnInit() {
  }

}
