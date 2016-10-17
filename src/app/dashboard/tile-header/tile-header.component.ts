import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'rump-tile-header',
  templateUrl: 'tile-header.component.html',
  styleUrls: ['tile-header.component.scss']
})
export class TileHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() iconName: string;
  @Input() backColor: string;
  @Input() info: string;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  showPopover(event) {
    $(event.target.parentNode).popover("show");
  }

  navigateTo(pageName: string, event) {
    if (!event.target.className.includes("tile-expand")) {
      this.router.navigate([pageName]);
    }
  }

}
