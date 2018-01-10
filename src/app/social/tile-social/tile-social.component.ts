/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SocialService } from '../social.service';
import { Post, MusicListen, Tweet } from '../../shared/interfaces';
import { MediaService } from '../media.service';
import { Subscription } from 'rxjs/Subscription';
import {TwitterService} from '../twitter.service';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rum-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.scss']
})
export class TileSocialComponent implements OnInit {
  public feed$: Observable<HatRecord<Post|Tweet>[]>;
  private postsSub: Subscription;
  private musicSub: Subscription;
  private twitterSub: Subscription;

  constructor(private socialSvc: SocialService,
              private mediaSvc: MediaService,
              private twitterSvc: TwitterService,
              private router: Router) {}

  ngOnInit(): void {
    this.feed$ = Observable.merge(
      this.socialSvc.data$,
      this.twitterSvc.data$
    )
      .scan((acc: HatRecord<Post|Tweet>[], postsToAdd: HatRecord<Post|Tweet>[]) => {
        return acc.concat(postsToAdd).sort((a, b) => a.data.createdTime.isAfter(b.data.createdTime) ? -1 : 1).slice(0, 30);
      }, []);

    this.socialSvc.getInitData();
    this.twitterSvc.getInitData();
  }

  navigateToFullPost(id: string): void {
    const navigationExtras: NavigationExtras = {
      fragment: id,
      preserveFragment: false
    };

    this.router.navigate(['social'], navigationExtras);
  }
}
