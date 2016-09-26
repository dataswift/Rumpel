import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services';

@Component({
  selector: 'rump-social',
  templateUrl: 'social.component.html',
  styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit {
  public feed$;

  constructor(private socialSvc: SocialService) {}

  ngOnInit() {
    this.feed$ = this.socialSvc.showAll();
  }
}
