import { Component, OnInit, Input } from '@angular/core';
import { Moment, LimitContentPipe, LimitMembersPipe, ContainsPipe } from '../../pipes';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.css'],
  pipes: [Moment, LimitContentPipe, LimitMembersPipe, ContainsPipe]
})
export class TileSocialComponent implements OnInit {
  @Input() title;
  @Input() feed;
  @Input() iconName;

  constructor() {}

  ngOnInit() {
  }

}
