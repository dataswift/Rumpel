import { Component, OnInit } from '@angular/core';
import {HatApiService} from "../../services/hat-api.service";
import {Notable} from "../../shared/interfaces/notable.class";

@Component({
  selector: 'rump-public-profile',
  templateUrl: 'public-profile.component.html',
  styleUrls: ['public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  private shared: boolean;
  private profile: any;
  private notables: Array<Notable>;

  constructor(private hatSvc: HatApiService) { }

  ngOnInit() {
    this.hatSvc.getPublicData("profile").subscribe((profileResponse: any) => {
      if (profileResponse["public"] === true) {
        this.shared = true;
        this.profile = profileResponse.profile;
        this.notables = profileResponse.notables.map((note: any) => new Notable(note, note.id));
      } else {
        this.shared = false;
      }
    });
  }

  get hostname(): string {
    return window.location.hostname;
  }

  isLoading(): boolean {
    return typeof this.shared === "undefined";
  }

}
