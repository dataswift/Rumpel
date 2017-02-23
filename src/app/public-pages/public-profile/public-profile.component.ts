import { Component, OnInit } from '@angular/core';
import {HatApiService} from "../../services/hat-api.service";
import {Notable} from "../../shared/interfaces/notable.class";
import {UserService} from "../../services/user.service";
import {User} from "../../shared/interfaces/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'rump-public-profile',
  templateUrl: 'public-profile.component.html',
  styleUrls: ['public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  private shared: boolean;
  private userAuthenticated: boolean = false;
  private profile: any;
  private notables: Array<Notable>;

  constructor(private hatSvc: HatApiService,
              private userSvc: UserService,
              private router: Router) { }

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

    this.userSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
    });
  }

  switchView() {
    this.router.navigate([ "profile" ]);
  }

  get hostname(): string {
    return window.location.hostname;
  }

  isLoading(): boolean {
    return typeof this.shared === "undefined";
  }

}
