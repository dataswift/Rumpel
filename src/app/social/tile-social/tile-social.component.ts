import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SocialService } from '../social.service';
import { Post, MusicListen } from '../../shared/interfaces';
import { MediaService } from "../../services/media.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'rump-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.scss']
})
export class TileSocialComponent implements OnInit, OnDestroy {
  private posts: Array<Post|MusicListen>;
  private postsSub: Subscription;
  private musicSub: Subscription;

  constructor(private socialSvc: SocialService,
              private mediaSvc: MediaService,
              private router: Router) {}

  ngOnInit(): void {
    this.posts = [];

    this.postsSub = this.socialSvc.socialFeed$.subscribe((posts: Post[]) => {
      this.posts = this.posts.concat(posts);

      this.sortPostsByDate();
    });

    this.musicSub = this.mediaSvc.data$.subscribe((listens: MusicListen[]) => {
      this.posts = this.posts.concat(listens);

      this.sortPostsByDate();
    });

    this.mediaSvc.getRecentData();
    this.socialSvc.getRecentPosts();
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.musicSub.unsubscribe();
  }

  navigateToFullPost(id: string): void {
    let navigationExtras: NavigationExtras = {
      fragment: id,
      preserveFragment: false
    };

    this.router.navigate(['social'], navigationExtras);
  }

  private sortPostsByDate(): void {
    this.posts = this.posts.sort((a, b) => a.createdTime.isAfter(b.createdTime) ? -1 : 1);
  }
}
