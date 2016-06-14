import { Component, OnInit } from '@angular/core';
import { TileProfileComponent } from '../tile-profile/tile-profile.component';

@Component({
  moduleId: module.id,
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
  directives: [TileProfileComponent]
})
export class GridComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
