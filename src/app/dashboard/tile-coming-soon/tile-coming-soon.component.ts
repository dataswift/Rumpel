import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rump-tile-coming-soon',
  templateUrl: 'tile-coming-soon.component.html',
  styleUrls: ['tile-coming-soon.component.scss']
})
export class TileComingSoonComponent implements OnInit {
  @Input() bkgImage: string;
  @Input() icon: string;
  @Input() title: string;

  constructor() {}

  ngOnInit() {
  }

}
