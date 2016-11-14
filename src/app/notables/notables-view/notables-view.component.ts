import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
  private profile: { photo: { url: string; shared: boolean; }; };
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

    Observable.forkJoin(
      this.profilesSvc.getPicture(),
      this.profilesSvc.getFullProfile()
    ).subscribe(results => {
      this.profile = {
        photo: {
          url: results[0].url,
          shared: results[1] ? results[1].fb_profile_photo.private === 'false' : false
        }
      };
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
