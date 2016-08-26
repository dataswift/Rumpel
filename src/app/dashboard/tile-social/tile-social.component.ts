import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services';
import { Moment, LimitContentPipe, LimitMembersPipe, ReplaceCharsPipe } from '../../pipes';

@Component({
  selector: 'rump-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.scss'],
  pipes: [Moment, LimitContentPipe, LimitMembersPipe, ReplaceCharsPipe]
})
export class TileSocialComponent implements OnInit {
  public feed$;

  constructor(private socialSvc: SocialService) {}

  ngOnInit() {
    this.feed$ = this.socialSvc.showAll();
  }

}
