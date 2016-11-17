import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiStateService, AuthService, NotificationsService } from '../../services';

@Component({
  selector: 'rump-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() navigateModal = new EventEmitter<any>();
  @Output() clickNotifications = new EventEmitter<string>();
  public selectedItem: string;
  private sub: any;
  public state: any;
  public menu: Array<any>;
  private comingSoonMenu: Array<any>;
  private unreadNotifications: number;
  private totalNotifications: number;

  // hack: uiState service needs to be injected before Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(private uiState: UiStateService,
              private _authSvc: AuthService,
              private _notificationsSvc: NotificationsService) {}

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this._authSvc.auth$.subscribe(authenticated => {
      if (authenticated) this._notificationsSvc.getAllNotifications();
    });

    this._notificationsSvc.stats$.subscribe(stats => {
      this.unreadNotifications = stats.unread;
      this.totalNotifications = stats.total;
    });

    this.menu = [
      { display: 'Dashboard', icon: 'dashboard', link: 'dashboard', dataType: '', disable: '' },
      { display: 'Notables', icon: 'notebook', link: 'notables', dataType: '', disable: '' },
      { display: 'Profile', icon: 'user', link: 'profile', dataType: 'profile', disable: '' },
      { display: 'Mashups', icon: 'layergroup', link: 'mixpad', dataType: '', disable: '' },
      { display: 'Locations', icon: 'tags', link: 'locations', dataType: 'locations', disable: 'no data' },
      { display: 'Calendar', icon: 'calendar', link: 'calendar', dataType: 'events', disable: 'no data' },
      { display: 'Social', icon: 'replyall', link: 'social', dataType: 'posts', disable: 'no data' },
      { display: 'Photos', icon: 'camera', link: 'photos', dataType: 'photos', disable: 'no data' },
      { display: 'Data Plugs', icon: 'puzzle', link: '', disable: '' }
    ];

    this.comingSoonMenu = [
      { display: 'Weather', icon: 'thermometer', link: '' },
      { display: 'Finance', icon: 'bank', link: '' },
      { display: 'Creations (music)', icon: 'guitar', link: '' },
      { display: 'Creations (art)', icon: 'brush', link: '' }
    ];

    this.sub = this.uiState.getState$().subscribe(state => {
      for (let dt of state.dataTypes) {
        let changeItem = this.menu.find(item => item.dataType === dt);
        if (changeItem) changeItem.disable = '';
      }
    });
  }

  onItemSelect(itemName: string) {
    this.selectedItem = itemName;
  }

  showNotificationsCentre() {
    this.clickNotifications.emit("Show notifications.");
  }
}
