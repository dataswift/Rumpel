import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Notable } from '../../shared/interfaces';
import { ProfilesService } from '../../profiles/profiles.service';
import { NotablesService } from '../notables.service';

@Component({
  selector: 'rump-tile-notables',
  templateUrl: 'tile-notables.component.html',
  styleUrls: ['tile-notables.component.scss']
})
export class TileNotablesComponent implements OnInit {
  public notables: Array<Notable>;
  private profile: { photo: { url: string; shared: boolean; }; };
  public iconMap: any;
  private sub: any;

  constructor(private notablesSvc: NotablesService,
              private profilesSvc: ProfilesService) {}

  ngOnInit() {
    this.notables =[];

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
          url: results[0] ? results[0].url : '',
          shared: results[1] ? results[1].fb_profile_photo.private === 'false' : false
        }
      };
    });

    this.notablesSvc.getRecentNotables();
  }

}
