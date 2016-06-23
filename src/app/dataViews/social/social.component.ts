import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocialService } from '../../services';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.css']
})
export class SocialComponent implements OnInit, OnDestroy {
  private _sub;
  public feed;

  constructor(private _socialSvc: SocialService) {}

  ngOnInit() {
    this._sub = this._socialSvc.socialFeed$.subscribe(updatedPosts => {
      this.feed = updatedPosts;
    });

    this._socialSvc.loadAll();
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
