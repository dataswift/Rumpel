import { Component, Input, OnInit } from '@angular/core';
import { SheFeed } from '../../../dashboard/she-feed.interface';

@Component({
  selector: 'rum-she-feed-item',
  templateUrl: './she-feed-item.component.html',
  styleUrls: ['./she-feed-item.component.scss']
})
export class SheFeedItemComponent implements OnInit {

  @Input() feedItem: SheFeed;

  constructor() { }

  ngOnInit() {
  }

}
