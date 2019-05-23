import { Component, Input, OnInit } from '@angular/core';
import { SheFeed } from '../../../../she/she-feed.interface';

@Component({
  selector: 'rum-she-feed-weekly-summary',
  templateUrl: './she-feed-weekly-summary.component.html',
  styleUrls: ['./she-feed-weekly-summary.component.scss']
})
export class SheFeedWeeklySummaryComponent implements OnInit {
  @Input() feedItem: SheFeed;

  constructor() { }

  ngOnInit() {
  }

}
