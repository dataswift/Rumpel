import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialService } from '../social.service';

@Component({
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {
  public posts;
  private filter;
  private postId: string;
  private svcSub: any;

  constructor(private socialSvc: SocialService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.posts = [];
    this.filter = '';

    this.route.fragment.subscribe(postId => {
      this.postId = postId;
    });

    this.svcSub = this.socialSvc.socialFeed$.subscribe(posts => {
      this.posts = posts;

      setTimeout(() => {
        if (this.postId && this.postId.length > 0) {
          var element = document.getElementById(this.postId);
          element.scrollIntoView();
        }
      }, 5);
    });

    this.socialSvc.getRecentPosts();
  }

  ngOnDestroy() {
    this.svcSub.unsubscribe();
  }

  filterBy(source: string) {
    this.filter = source;
  }
}
