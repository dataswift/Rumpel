import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from './hat-api.service';
import { DataPoint } from '../shared';
import * as moment from 'moment';

@Injectable()
export class SocialService {
  private socialFeed$: Subject<DataPoint[]>;
  private store: { posts: Array<DataPoint> };

  constructor(private hat: HatApiService) {
    this.store = { posts: [] };
    this.socialFeed$ = <Subject<DataPoint[]>>new Subject();
  }

  showAll(): Observable<DataPoint[]> {
    if (this.store.posts.length > 0) {
      console.log('Inside social if');
      return Observable.of(this.store.posts);
    }

    this.loadAll().subscribe(
      data => {
        this.store.posts = data;
        this.socialFeed$.next(this.store.posts);
      },
      err => console.log(`Posts table could not be found.`)
    );
    return this.socialFeed$.asObservable();
  }

  loadAll(): Observable<DataPoint[]> {
    return this.loadFrom('facebook')
      .map(posts => posts.map(this.fbMap))
      .map(posts => posts.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1));
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('posts', source);
  }

  fbMap(post: any): DataPoint {
    let postContent;
    switch (post.posts.type) {
      case "link":
        postContent = {
          caption: post.posts.caption,
          description: post.posts.description,
          link: post.posts.link,
          name: post.posts.name,
          picture: post.posts.picture,
          fullPicture: post.posts.full_picture
        };
        break;
      case "status":
        postContent = {
          message: post.posts.message
        }
        break;
      case "photo":
        postContent = {
          name: post.posts.name,
          message: post.posts.message,
          picture: post.posts.picture,
          fullPicture: post.posts.full_picture
        }
        break;
      default:
        postContent = null;
        break;
    }

    return {
      timestamp: moment(post.posts.created_time),
      type: 'post',
      source: 'facebook',
      content: {
        createdTime: moment(post.posts.created_time),
        updatedTime: moment(post.posts.updated_time),
        statusType: post.posts.status_type,
        type: post.posts.type,
        privacy: {
          value: post.posts.privacy.value,
          description: post.posts.privacy.description
        },
        from: !!post.posts.from ? post.posts.from.name: null,
        application: !!post.posts.application ? post.posts.application.name : null,
        story: post.posts.story,
        content: postContent
      }
    };
  }
}
