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
    console.log('structure', this.nestedStructure);
  }

  imageAsset(source: string): string {
    if (source.includes('twitter') ) {
      return 'twitter'
    } else if (source.includes('facebook') ) {
      return 'facebook'
    } else if (source.includes('spotify') ) {
      return 'spotify'
    } else if (source.includes('notables') ) {
      return 'notables'
    } else if (source.includes('google') ) {
      return 'google'
    } else if (source.includes('instagram') ) {
      return 'instagram'
    } else if (source.includes('fitbit') ) {
      return 'fitbit'
    } else if (source.includes('monzo') ) {
      return 'monzo'
    } else if (source.includes('sentiment') ) {
      return 'sentiment'
    } else if (source.includes('wordcloud') ) {
      return 'wordcloud'
    } else {
      return 'she'
    }

  }
}
