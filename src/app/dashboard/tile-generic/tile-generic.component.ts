import { Component, OnInit, Input } from '@angular/core';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-generic',
  templateUrl: 'tile-generic.component.html',
  styleUrls: ['tile-generic.component.css'],
  pipes: [Moment]
})
export class TileGenericComponent implements OnInit {
  @Input() data;

  constructor() {}

  ngOnInit() {
  }

}
