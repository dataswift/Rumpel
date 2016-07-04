import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { HatApiService } from './hat-api.service';
import { Post } from '../shared/index';
import * as moment from 'moment';

@Injectable()
export class SocialService {
  private socialFeed$: Observable<any>;
  private socialObserver: Observer<any>;
  private store: { posts: Array<Post> };

  constructor(private hat: HatApiService) {
    this.store = { posts: [] };
    this.socialFeed$ = new Observable(observer => this.socialObserver = observer).share();
  }

  showAll(): Observable<any> {
    if (this.store.posts.length > 0) {
      console.log('Inside social if');
      return Observable.of(this.store.posts);
    }

    this.loadAll().subscribe(
      data => {
        this.store.posts = data;
        this.socialObserver.next(this.store.posts);
      },
      err => console.log(`Posts table could not be found.`)
    );
    return this.socialFeed$;
  }

  loadAll(): Observable<Array<Post>> {
    return this.loadFrom('facebook').map(posts => posts.map(this.fbMap));
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getTable('posts', source);
  }

  fbMap(post: any): Post {
    return {
      title: post.name,
      body: post.message,
      start: moment(post.created_time),
      type: post.type,
      image: post.full_picture,
      privacy: post.privacy.description,
      source: 'facebook'
    };
  }

}
