import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SheFeed } from '../../../she/she-feed.interface';

@Component({
  selector: 'rum-she-feed-item',
  templateUrl: './she-feed-item.component.html',
  styleUrls: ['./she-feed-item.component.scss']
})
export class SheFeedItemComponent implements OnInit, AfterViewInit {
  @Input() feedItem: SheFeed;
  @ViewChild('cardContent', { static: true }) content: ElementRef;
  public expanded = false;
  public overflowing = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.content) {
      const nativeEl = this.content.nativeElement;
      this.overflowing = nativeEl.clientHeight < nativeEl.scrollHeight;
      this.cd.detectChanges();
    }
  }

  expandCard(): void {
    this.expanded = true;
  }

  imageSource(source: string, types?: string[]) {
    if (source === 'she') {
      if (types.includes('sentiment')) {
        return 'sentiment';
      } else {
        return 'she';
      }
    } else if (source === 'drops') {
      if (types.includes('wordcloud')) {
        return 'wordcloud';
      } else {
        return 'she';
      }
    } else {
      return this.imageAsset(source);
    }
  }
  imageAsset(source: string): string {
    return source.split('-')[0] || 'she';
  }
}
