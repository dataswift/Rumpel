/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialService } from '../social.service';
import { MediaService } from '../media.service';
import { TwitterService } from '../twitter.service';
import { Post, MusicListen, Tweet } from '../../shared/interfaces';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rum-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit {
  public feed$: Observable<HatRecord<Post|Tweet>[]>;
  public filter = '';
  public filterMap = {
    'Facebook': 'status,photo,music.listens,link',
    'Twitter': 'tweet'
  };

  constructor(private socialSvc: SocialService,
              private mediaSvc: MediaService,
              private twitterSvc: TwitterService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.feed$ = Observable.merge(
      this.socialSvc.data$,
      this.twitterSvc.data$
    )
      .scan((acc: HatRecord<Post|Tweet>[], postsToAdd: HatRecord<Post|Tweet>[]) => {
        return acc.concat(postsToAdd).sort((a, b) => a.data.createdTime.isAfter(b.data.createdTime) ? -1 : 1);
      }, [])
      .do(() => this.scrollToPost());

    this.socialSvc.getInitData();
    this.twitterSvc.getInitData();
  }

  filterBy(source: string): void {
    this.filter = source;
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
}
