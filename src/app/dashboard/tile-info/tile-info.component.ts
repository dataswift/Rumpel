import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-info',
  templateUrl: 'tile-info.component.html',
  styleUrls: ['tile-info.component.css']
})
export class TileInfoComponent implements OnInit {
  @Input() link: string;
  @Input() icon: string;
  @Input() bkgColor: string;
  @Input() infoText: string;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  navigate() {
    this.router.navigate([this.link]);
  }

}
