import { Component, OnInit } from '@angular/core';
import { NotablesService } from '../notables.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { Notable, Profile } from '../../shared/interfaces';
import {DialogService} from "../../layout/dialog.service";
import {ConfirmBoxComponent} from "../../layout/confirm-box/confirm-box.component";

@Component({
  selector: 'rump-notables-view',
  templateUrl: './notables-view.component.html',
  styleUrls: ['./notables-view.component.scss']
})
export class NotablesViewComponent implements OnInit {
  private ASSET_MAP = {
    "marketsquare": "assets/icons/marketsquare-icon.png",
    "facebook": "assets/icons/facebook-plug.png"
  };

  public notables: Array<Notable>;
  private profile: { photo: { url: string; shared: boolean; }; };
  public iconMap: any;
  public filter: string;

  constructor(private notablesSvc: NotablesService,
              private profilesSvc: ProfilesService,
              private dialogSvc: DialogService) { }

  ngOnInit() {
    this.filter = '';
    this.notables = [];

    this.iconMap = {
      note: 'ellipsischat',
      list: 'list',
      blog: 'write'
    };

    this.notablesSvc.data$.subscribe((notables: Notable[]) => {
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

  filterBy(category: string) {
    this.filter = category;
  }

  editNotable(notable: Notable) {
    this.notablesSvc.editNotable(notable);
    window.scrollTo(0, 100);
  }

  deleteNotable(event, notable: Notable) {
    if (notable.isShared) {
      this.dialogSvc.createDialog(ConfirmBoxComponent, {
        message: `Deleting a note that has already been shared will not delete it at the destination. 
          To remove a note from the external site, first make it private. You may then choose to delete it.`,
        accept: () => {
          event.target.parentNode.parentNode.className += " removed-item";
          setTimeout(() => this.notablesSvc.deleteNotable(notable.id), 900);
        }
      });
    } else {
      event.target.parentNode.parentNode.className += " removed-item";
      setTimeout(() => this.notablesSvc.deleteNotable(notable.id), 900);
    }
  }

}
