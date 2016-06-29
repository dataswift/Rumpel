import { Component, OnInit, Input } from '@angular/core';
import { Moment, LimitMembersPipe } from '../../pipes';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-generic',
  templateUrl: 'tile-generic.component.html',
  styleUrls: ['tile-generic.component.css'],
  pipes: [Moment, LimitMembersPipe]
})
export class TileGenericComponent implements OnInit {
  @Input() data;

  constructor() {}

  ngOnInit() {
  }

}
