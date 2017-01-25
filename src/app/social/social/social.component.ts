/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialService } from '../social.service';
import { Post, MusicListen, Tweet } from '../../shared/interfaces';
import { Subscription } from "rxjs";
import {MediaService} from "../media.service";
import {TwitterService} from "../twitter.service";

@Component({
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {
  private posts: Array<Post|MusicListen|Tweet>;
  private filter: string;
  private svcSub: Subscription;
  private musicSub: Subscription;
  private twitterSub: Subscription;

  constructor(private socialSvc: SocialService,
              private mediaSvc: MediaService,
              private twitterSvc: TwitterService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.posts = [];
    this.filter = '';

    this.svcSub = this.socialSvc.data$.subscribe((posts: Post[]) => {
      this.posts = this.posts.concat(posts);

      this.sortPostsByDate();
      this.scrollToPost();
    });

    this.musicSub = this.mediaSvc.data$.subscribe((listens: MusicListen[]) => {
      this.posts = this.posts.concat(listens);

      this.sortPostsByDate();
      this.scrollToPost();
    });

    this.twitterSub = this.twitterSvc.data$.subscribe((tweets: Tweet[]) => {
      this.posts = this.posts.concat(tweets);

      this.sortPostsByDate();
      this.scrollToPost();
    });

    this.socialSvc.getRecentData();
    this.mediaSvc.getRecentData();
    this.twitterSvc.getRecentData();
  }

  ngOnDestroy(): void {
    this.svcSub.unsubscribe();
    this.musicSub.unsubscribe();
    this.twitterSub.unsubscribe();
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
