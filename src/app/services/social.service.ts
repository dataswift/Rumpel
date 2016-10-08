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
        }
        break;
      case "photo":
        postContent = {
          name: post.data.posts.name,
          message: post.data.posts.message,
          picture: post.data.posts.picture,
          fullPicture: post.data.posts.full_picture
        }
        break;
      default:
        postContent = null;
        break;
    }

    return {
      timestamp: moment(post.data.posts.created_time),
      type: 'post',
      source: 'facebook',
      content: {
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
      }
    };
  }
}
