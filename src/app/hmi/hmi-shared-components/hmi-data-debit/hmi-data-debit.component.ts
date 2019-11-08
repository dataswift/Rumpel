import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../../explore/hat-application.interface';

@Component({
  selector: 'rum-hmi-data-debit',
  templateUrl: './hmi-data-debit.component.html',
  styleUrls: ['./hmi-data-debit.component.scss']
})
export class HmiDataDebitComponent implements OnInit {
  @Input() app: HatApplicationContent;

  constructor() { }

  ngOnInit() {
  }

}
