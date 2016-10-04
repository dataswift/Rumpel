import { Component, OnInit } from '@angular/core';
import { Notable } from '../../shared/interfaces';
import { ProfileService } from '../../services';
import { NotablesService } from '../notables.service';

@Component({
  selector: 'rump-tile-notables',
  templateUrl: 'tile-notables.component.html',
  styleUrls: ['tile-notables.component.scss']
})
export class TileNotablesComponent implements OnInit {
  public notables: Array<Notable>;
  public profilePhoto: any;
  private sub: any;

  constructor(private notablesSvc: NotablesService,
              private profileSvc: ProfileService) {}

  ngOnInit() {
    this.notables =[];
    this.profilePhoto = {};

    this.notablesSvc.notables$.subscribe(notables => {
      this.notables = notables;
    });

    this.profileSvc.getPicture().subscribe(picture => {
      this.profilePhoto = picture;
    });

    this.notablesSvc.getRecentNotables();
  }

}
