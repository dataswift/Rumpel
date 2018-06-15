import { Component, Input, OnInit } from '@angular/core';
import { SheFeed } from '../she-feed.interface';

const MIN_ROLLUP_ITEMS = 3;

@Component({
  selector: 'rum-she-feed-rollup',
  templateUrl: './she-feed-rollup.component.html',
  styleUrls: ['./she-feed-rollup.component.scss']
})
export class SheFeedRollupComponent implements OnInit {
  @Input() sheFeed: SheFeed[];
  public rolledUpFeed: Array<{ expanded: boolean; rollup: Array<SheFeed>; }> = [];
  public minItemsForRollup = MIN_ROLLUP_ITEMS;

  constructor() { }

  ngOnInit() {
    this.rolledUpFeed = this.sheFeed.reduce((acc, sheItem: SheFeed, index: number, sheFeed: SheFeed[]) => {
      const previousSource = index > 0 ? sheFeed[index - 1].source : null;

      if (previousSource === sheItem.source) {
        acc[acc.length - 1].rollup.push(sheItem);
      } else {
        acc.push({ expanded: false, rollup: [sheItem]});
      }

      return acc;
    }, []);
  }

}
