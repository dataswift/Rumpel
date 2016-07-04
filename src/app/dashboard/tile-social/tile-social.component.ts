import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services';
import { Moment, LimitContentPipe, LimitMembersPipe, ContainsPipe } from '../../pipes';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.css'],
  pipes: [Moment, LimitContentPipe, LimitMembersPipe, ContainsPipe]
})
export class TileSocialComponent implements OnInit {
  public feed$;

  constructor(private socialSvc: SocialService) {}

  ngOnInit() {
    this.feed$ = this.socialSvc.showAll();
  }

}
