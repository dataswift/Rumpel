import { Component, OnInit } from '@angular/core';
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
  public profilePhoto: any;
  public iconMap: any;
  private sub: any;

  constructor(private notablesSvc: NotablesService,
              private profilesSvc: ProfilesService) {}

  ngOnInit() {
    this.notables =[];
    this.profilePhoto = {};

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

}
