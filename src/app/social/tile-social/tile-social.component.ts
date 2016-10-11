import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social.service';

@Component({
  selector: 'rump-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.scss']
})
export class TileSocialComponent implements OnInit {
  public posts;

  constructor(private socialSvc: SocialService) {}

  ngOnInit() {
    this.posts = [];

    this.socialSvc.socialFeed$.subscribe(posts => {
      this.posts = posts;
    });

    this.socialSvc.getRecentPosts();
  }

}
