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
    return this.loadFrom('facebook').map(posts => posts.map(this.fbMap));
  }

  loadFrom(source: string): Observable<any> {
    return this.hat.getAllValuesOf('posts', source);
  }

  fbMap(post: any): DataPoint {
    let postContent;
    switch (post.type) {
      case "link":
        postContent = {
          caption: post.caption,
          description: post.description,
          link: post.link,
          name: post.name,
          picture: post.picture,
          fullPicture: post.full_picture
        };
        break;
      case "status":
        postContent = {
          message: post.message
        }
        break;
      case "photo":
        postContent = {
          name: post.name,
          message: post.message,
          picture: post.picture,
          fullPicture: post.full_picture
        }
        break;
      default:
        postContent = null;
        break;
    }

    return {
      timestamp: moment(post.created_time),
      type: 'post',
      source: 'facebook',
      content: {
        createdTime: moment(post.created_time),
        updatedTime: moment(post.updated_time),
        statusType: post.status_type,
        type: post.type,
        privacy: {
          value: post.privacy.value,
          description: post.privacy.description
        },
        from: post.from.name,
        application: post.application.name,
        story: post.story,
        content: postContent
      }
    };
  }
}
