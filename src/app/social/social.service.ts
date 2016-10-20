import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

import { HatApiService } from '../services/hat-api.service';
import { DataPoint } from '../shared/data-point.interface';
import * as moment from 'moment';

@Injectable()
export class SocialService {
  private _socialFeed$: Subject<DataPoint[]>;
  public socialFeed$: Observable<DataPoint[]>;

  private store: {
    posts: Array<DataPoint>;
    tableId: number;
  };
  private tableVerified: boolean;
  private failedAttempts: number;

  constructor(private hat: HatApiService) {
    this.store = {
      posts: [],
      tableId: null
    };
    this.tableVerified = false;
    this.failedAttempts = 0;

    this._socialFeed$ = <Subject<DataPoint[]>>new Subject();
    this.socialFeed$ = this._socialFeed$.asObservable();

    this.verifyTable();
  }

  getRecentPosts() {
    if (this.store.posts.length > 0) {
      this.pushToStream();
    } else if (this.store.tableId) {
      this.hat.getValuesWithLimit(this.store.tableId)
        .map(posts => posts.map(this.fbMap))
        .map(posts => posts.sort((a, b) => a.timestamp.isAfter(b.timestamp) ? -1 : 1))
        .subscribe(posts => {
          this.store.posts = posts;

          this.pushToStream();
        });
    } else if (this.failedAttempts <= 10) {
      this.failedAttempts++;
      return Observable.timer(75).subscribe(() => this.getRecentPosts());
    }
  }

  showAll(): Observable<DataPoint[]> {
    if (this.store.posts.length > 0) {
      console.log('Inside social if');
      return Observable.of(this.store.posts);
    }

    this.loadAll().subscribe(
      data => {
        this.store.posts = data;
        this.pushToStream();
      },
      err => console.log(`Posts table could not be found.`)
    );
    //return this.socialFeed$.asObservable();
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
      timestamp: moment(post.data.posts.created_time),
      type: 'post',
      source: 'facebook',
      content: {
        id: post.data.posts.id.split("_")[1],
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

  private verifyTable() {
    this.hat.getTable('posts', 'facebook')
      .subscribe(table => {
        if (table === "Not Found") {
          this.tableVerified = false;
        } else if (table.id) {
          this.store.tableId = table.id;
          this.tableVerified = true;
        }
      });
  }

  private pushToStream() {
    return this._socialFeed$.next(this.store.posts);
  }
}
