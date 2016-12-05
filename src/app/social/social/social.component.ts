import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialService } from '../social.service';
import { Post, MusicListen } from '../../shared/interfaces';
import { Subscription } from "rxjs";
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {
  private posts: Array<any>;
  private filter: string;
  private svcSub: Subscription;
  private musicSub: Subscription;

  constructor(private socialSvc: SocialService,
              private mediaSvc: MediaService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.posts = [];
    this.filter = '';

    this.svcSub = this.socialSvc.socialFeed$.subscribe((posts: Post[]) => {
      this.posts = this.posts.concat(posts);

      this.sortPostsByDate();
      this.scrollToPost();
    });

    this.musicSub = this.mediaSvc.musicListens$.subscribe((listens: MusicListen[]) => {
      this.posts = this.posts.concat(listens);

      this.sortPostsByDate();
      this.scrollToPost();
    });

    this.socialSvc.getRecentPosts();
    this.mediaSvc.getRecentMusicListens();
  }

  ngOnDestroy(): void {
    this.svcSub.unsubscribe();
    this.musicSub.unsubscribe();
  }

  filterBy(source: string): void {
    this.filter = source;
  }

  private sortPostsByDate(): void {
    this.posts = this.posts.sort((a, b) => a.createdTime.isAfter(b.createdTime) ? -1 : 1);
  }

  private scrollToPost(): void {
    const fragmentFound = this.route.snapshot.fragment;

    if (fragmentFound) {
      setTimeout(() => {
        var element = document.getElementById(fragmentFound);
        element.scrollIntoView();
      }, 5);
    }
  }
}
