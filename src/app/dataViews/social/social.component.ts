import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.css']
})
export class SocialComponent implements OnInit {
  public feed$;

  constructor(private socialSvc: SocialService) {}

  ngOnInit() {
    this.feed$ = this.socialSvc.showAll();
  }
}
