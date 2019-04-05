import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rum-she-feed-weekly-summary-list',
  templateUrl: './she-feed-weekly-summary-list.component.html',
  styleUrls: ['./she-feed-weekly-summary-list.component.scss']
})
export class SheFeedWeeklySummaryListComponent implements OnInit {
  @Input() nestedStructure: { source: string; content: string; badge: string; }[];

  constructor() { }

  ngOnInit() {
  }

  imageAsset(source: string): string {
    return source.split('-')[0] || 'she';
  }
}
