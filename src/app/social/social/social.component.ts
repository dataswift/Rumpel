import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social.service';

@Component({
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit {
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
