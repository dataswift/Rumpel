import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-generic',
  templateUrl: 'tile-generic.component.html',
  styleUrls: ['tile-generic.component.css']
})
export class TileGenericComponent implements OnInit {
  @Input() title;
  @Input() data;
  @Input() iconName;

  constructor() {}

  ngOnInit() {
  }

}
