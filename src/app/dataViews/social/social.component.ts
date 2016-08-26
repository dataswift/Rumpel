import { Component, OnInit } from '@angular/core';
import { FbPostComponent } from '../fb-post/fb-post.component';
import { SocialService } from '../../services';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss'],
  directives: [FbPostComponent]
})
export class SocialComponent implements OnInit {
  public feed$;

  constructor(private socialSvc: SocialService) {}

  ngOnInit() {
    this.feed$ = this.socialSvc.showAll();
  }
}
