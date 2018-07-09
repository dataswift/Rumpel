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
import { TwitterService } from '../twitter.service';
import { Post, Tweet } from '../../shared/interfaces';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { merge, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'rum-tile-social',
  templateUrl: 'tile-social.component.html',
  styleUrls: ['tile-social.component.scss']
})
export class TileSocialComponent implements OnInit {
  public feed$: Observable<HatRecord<Post|Tweet>[]>;

  constructor(private socialSvc: SocialService,
              private twitterSvc: TwitterService,
              private router: Router) {}

  ngOnInit(): void {
    this.feed$ = merge(
      this.socialSvc.data$,
      this.twitterSvc.data$
    ).pipe(
      scan((acc: HatRecord<Post|Tweet>[], postsToAdd: HatRecord<Post|Tweet>[]) => {
        return acc.concat(postsToAdd).sort((a, b) => a.data.createdTime.isAfter(b.data.createdTime) ? -1 : 1).slice(0, 30);
      }, []));

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
