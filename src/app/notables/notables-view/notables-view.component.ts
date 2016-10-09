import { Component, OnInit } from '@angular/core';
import { NotablesService } from '../notables.service';
import { ProfileService } from '../../services';
import { Notable } from '../../shared/interfaces';

import * as moment from 'moment';

@Component({
  selector: 'rump-notables-view',
  templateUrl: './notables-view.component.html',
  styleUrls: ['./notables-view.component.scss']
})
export class NotablesViewComponent implements OnInit {
  public notables: Array<Notable>;
  public profilePhoto: any;
  public iconMap: any;
  public filter: string;

  constructor(private notablesSvc: NotablesService,
              private profileSvc: ProfileService) { }

  ngOnInit() {
    this.filter = '';
    this.notables = [];

    this.iconMap = {
      note: 'ellipsischat',
      list: 'list',
      blog: 'write'
    };

    this.notablesSvc.notables$.subscribe(notables => {
      this.notables = notables;
    });

    this.profileSvc.getPicture().subscribe(picture => {
      this.profilePhoto = picture;
    });

    this.notablesSvc.getRecentNotables();
  }

  filterBy(category: string) {
    this.filter = category;
  }

}
