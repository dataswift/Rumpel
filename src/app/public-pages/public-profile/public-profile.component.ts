import { Component, OnInit } from '@angular/core';
import {HatApiService} from "../../services/hat-api.service";

@Component({
  selector: 'rump-public-profile',
  templateUrl: 'public-profile.component.html',
  styleUrls: ['public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  private shared: boolean;
  private profile: any;
  private notables: Array<any>;
  private iconMap = {
    note: 'ellipsischat',
    list: 'list',
    blog: 'write'
  };

  constructor(private hatSvc: HatApiService) { }

  ngOnInit() {
    this.hatSvc.getPublicData("profile").subscribe((profileResponse: any) => {
      if (profileResponse["public"] === true) {
        this.shared = true;
        this.profile = profileResponse.profile;
        this.notables = profileResponse.notables;
      } else {
        this.shared = false;
      }
    });
  }

}
