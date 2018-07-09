import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SheFeed } from '../../../she/she-feed.interface';

@Component({
  selector: 'rum-she-feed-item',
  templateUrl: './she-feed-item.component.html',
  styleUrls: ['./she-feed-item.component.scss']
})
export class SheFeedItemComponent implements OnInit, AfterViewInit {
  @Input() feedItem: SheFeed;
  @ViewChild('cardContent') content: ElementRef;
  public expanded = false;
  public overflowing = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.content) {
      const nativeEl = this.content.nativeElement;
      this.overflowing = nativeEl.clientHeight < nativeEl.scrollHeight;
    }
  }

  expandCard(): void {
    this.expanded = true;
  }

}
