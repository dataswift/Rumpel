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
import { Subscription } from 'rxjs/Subscription';
import {MediaService} from '../media.service';
import {TwitterService} from '../twitter.service';

declare var $:any;

@Component({
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {
  public posts: Array<Post|MusicListen|Tweet>;
  public filter: string;
  public filterMap: any;
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
    this.filterMap = {
      'Facebook': 'status,photo,music.listens,link',
      'Twitter': 'tweet'
    };

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
        const element = document.getElementById(fragmentFound);
        element.scrollIntoView();
      }, 5);
    }
  }

  showPopover(event) {
    $('[data-toggle="popover"]').popover();
  }
}
