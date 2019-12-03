import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../../explore/hat-application.interface';

@Component({
  selector: 'rum-hmi-rating',
  templateUrl: './hmi-rating.component.html',
  styleUrls: ['./hmi-rating.component.scss']
})
export class HmiRatingComponent implements OnInit {
  @Input() app: HatApplicationContent;

  constructor() { }

  ngOnInit() {
  }

}
