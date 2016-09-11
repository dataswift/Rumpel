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
    $('[data-toggle="popover"]').click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).popover("show");
    });
  }

  navigateTo(pageName: string) {
    this.router.navigate([pageName]);
  }

}
