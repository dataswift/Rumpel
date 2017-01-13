/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from '../services/hat-api.service';
import { Post } from '../shared/interfaces';
import { uniqBy } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class SocialService {
  private _socialFeed$: Subject<Post[]>;
  public socialFeed$: Observable<Post[]>;

  private store: {
    posts: Array<Post>;
    tableId: number;
  };
  private failedAttempts: number;

  constructor(private hat: HatApiService) {
    this.store = {
      posts: [],
      tableId: null
    };
    this.failedAttempts = 0;

    this._socialFeed$ = <Subject<Post[]>>new Subject();
    this.socialFeed$ = this._socialFeed$.asObservable();

    this.verifyTable();
  }

  getRecentPosts() {
    if (this.store.posts.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this.hat.getValuesWithLimit(this.store.tableId)
        .map((rawPosts: any[]) => {
          let rumpPosts = rawPosts.map(this.fbMap);
          return uniqBy(rumpPosts, "id");
        })
        .subscribe(posts => {
          this.store.posts = posts;

          this.pushToStream();
        });
    } else if (this.failedAttempts <= 10) {
      this.failedAttempts++;
      return Observable.timer(75).subscribe(() => this.getRecentPosts());
    }
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('posts', source);
  }

  fbMap(post: any): Post {
    let postContent;
    switch (post.data.posts.type) {
      case "link":
        postContent = {
          caption: post.data.posts.caption,
          description: post.data.posts.description,
          link: post.data.posts.link,
          name: post.data.posts.name,
          picture: post.data.posts.picture,
          fullPicture: post.data.posts.full_picture
        };
        break;
      case "status":
        postContent = {
          message: post.data.posts.message
        };
        break;
      case "photo":
        postContent = {
          name: post.data.posts.name,
          message: post.data.posts.message,
          picture: post.data.posts.picture,
          fullPicture: post.data.posts.full_picture
        };
        break;
      default:
        postContent = null;
        break;
    }

    return {
      id: post.data.posts.id,
      createdTime: moment(post.data.posts.created_time),
      updatedTime: moment(post.data.posts.updated_time),
      statusType: post.data.posts.status_type,
      type: post.data.posts.type,
      privacy: {
        value: post.data.posts.privacy.value,
        description: post.data.posts.privacy.description
      },
      from: !!post.data.posts.from ? post.data.posts.from.name: null,
      application: !!post.data.posts.application ? post.data.posts.application.name : null,
      story: post.data.posts.story,
      content: postContent
    };
  }

  private verifyTable() {
    this.hat.getTable('posts', 'facebook')
      .subscribe(table => {
        if (table === "Not Found") {
          console.log("Facebook posts table was not found.");
        } else if (table.id) {
          this.store.tableId = table.id;
        }
      });
  }

  private pushToStream() {
    return this._socialFeed$.next(this.store.posts);
  }
}
