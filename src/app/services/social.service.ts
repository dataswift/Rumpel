import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { HatApiService } from './hat-api.service';
import { Post } from '../shared/index';
import * as moment from 'moment';

@Injectable()
export class SocialService {
  socialFeed$: Observable<any>;
  private _socialObserver: Observer<any>;
  private _dataLoaded: boolean;
  private _store: { posts: Array<Post> };

  constructor(private _hat: HatApiService) {
    this._dataLoaded = false;
    this._store = { posts: [] };
    this.socialFeed$ = new Observable(observer => this._socialObserver = observer).share();
  }

  loadAll() {
    if (this._dataLoaded) return this._socialObserver.next(this._store.posts);

    this._hat.getTable('posts', 'facebook').subscribe(
      data => {
        const newPosts: Array<Post> = data.map((post: any) => {
          return {
            title: post.name,
            body: post.message,
            start: moment(post.created_time),
            type: post.type,
            image: post.full_picture,
            privacy: post.privacy.description
          };
        });

        this._dataLoaded = true;
        this._store.posts = newPosts;
        this._socialObserver.next(this._store.posts);
      },
      err => console.log(`Table for posts from facebook could not be found`)
    );
  }

}
