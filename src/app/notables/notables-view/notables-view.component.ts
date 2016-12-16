import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { NotablesService } from '../notables.service';
import { ProfilesService } from '../../profiles/profiles.service';
import { Notable, Profile } from '../../shared/interfaces';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import set = Reflect.set;

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
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

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

  deleteNotable(event, id: number) {
    this.createConfirmModal().then(resultPromise => {
      resultPromise.result.then(
        result => {
          if (result === true) {
            event.target.parentNode.parentNode.className += " removed-item";
            setTimeout(() => this.notablesSvc.deleteNotable(id), 900);
          }
        },
        error => {
          console.log('Deleting notable was cancelled.');
        });
    });

  }

  private createConfirmModal() {
    return this.modal.confirm()
      .size('md')
      .showClose(true)
      .title('Are you sure?')
      .body('Deleting a note will not delete where it has been shared. To delete where it has been shared, make the note private.')
      .okBtn('DELETE')
      .cancelBtn('Cancel')
      .open();
  }

}
