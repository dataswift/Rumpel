import { Component, OnInit } from '@angular/core';
import { NotablesService } from '../notables.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { Notable } from '../../shared/interfaces';
import set = Reflect.set;

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
              private profilesSvc: ProfilesService) { }

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

    this.profilesSvc.getPicture().subscribe(picture => {
      this.profilePhoto = picture;
    });

    this.notablesSvc.getRecentNotables();
  }

  filterBy(category: string) {
    this.filter = category;
  }

  editNotable(notable: Notable) {
    this.notablesSvc.editNotable(notable);
    window.scrollTo(0, 100);
  }

  deleteNotable(event, id: number) {
    event.target.parentNode.parentNode.className += " removed-item";
    setTimeout(() => this.notablesSvc.deleteNotable(id), 900);
  }

}
