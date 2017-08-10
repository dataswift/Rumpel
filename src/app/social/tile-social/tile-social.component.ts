/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SocialService } from '../social.service';
import { Post, MusicListen, Tweet } from '../../shared/interfaces';
import { MediaService } from '../media.service';
import { Subscription } from 'rxjs/Subscription';
import {TwitterService} from '../twitter.service';

@Component({
  selector: 'rump-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.scss']
})
export class TileSocialComponent implements OnInit, OnDestroy {
  public posts: Array<Post|MusicListen|Tweet>;
  private postsSub: Subscription;
  private musicSub: Subscription;
  private twitterSub: Subscription;

  constructor(private socialSvc: SocialService,
              private mediaSvc: MediaService,
              private twitterSvc: TwitterService,
              private router: Router) {}

  ngOnInit(): void {
    this.posts = [];

    this.postsSub = this.socialSvc.data$.subscribe((posts: Post[]) => {
      this.posts = this.posts.concat(posts);

      this.sortPostsByDate();
    });

    this.musicSub = this.mediaSvc.data$.subscribe((listens: MusicListen[]) => {
      this.posts = this.posts.concat(listens);

      this.sortPostsByDate();
    });

    this.twitterSub = this.twitterSvc.data$.subscribe((tweets: Tweet[]) => {
      this.posts = this.posts.concat(tweets);

      this.sortPostsByDate();
    });


  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.musicSub.unsubscribe();
    this.twitterSub.unsubscribe();
  }

  navigateToFullPost(id: string): void {
    const navigationExtras: NavigationExtras = {
      fragment: id,
      preserveFragment: false
    };

    this.router.navigate(['social'], navigationExtras);
  }

  private sortPostsByDate(): void {
    this.posts = this.posts.sort((a, b) => a.createdTime.isAfter(b.createdTime) ? -1 : 1);
    this.posts = this.posts.slice(0, 3);
  }
}
