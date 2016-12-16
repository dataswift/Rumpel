import { Component, OnInit } from '@angular/core';
import { Notable, Profile } from '../../shared/interfaces';
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

    this.notablesSvc.data$.subscribe(notables => {
      this.notables = notables;
    });

    this.profile = {
      photo: { url: "", shared: false }
    };

    this.profilesSvc.getPicture().subscribe(result => {
      if (result && result.url) {
        this.profile.photo.url = result.url;
      }
    });

    this.profilesSvc.data$.subscribe((profileSnapshots: Profile[]) => {
      let latestSnapshot = profileSnapshots[0];
      if (latestSnapshot && latestSnapshot.fb_profile_photo) {
        this.profile.photo.shared = !latestSnapshot.fb_profile_photo.private;
      }
    });

    this.profilesSvc.getRecentData();
    this.notablesSvc.getRecentData();
  }

}
