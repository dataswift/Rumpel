import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SocialService } from '../social.service';
import { Post } from '../../shared/interfaces';

@Component({
  selector: 'rump-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.scss']
})
export class TileSocialComponent implements OnInit {
  public posts: Array<Post>;

  constructor(private socialSvc: SocialService,
              private router: Router) {}

  ngOnInit() {
    this.posts = [];

    this.socialSvc.socialFeed$.subscribe(posts => {
      this.posts = posts;
    });

    this.socialSvc.getRecentPosts();
  }

  navigateToFullPost(id: string) {
    let navigationExtras: NavigationExtras = {
      fragment: id,
      preserveFragment: false
    };

    this.router.navigate(['social'], navigationExtras);
  }
}
