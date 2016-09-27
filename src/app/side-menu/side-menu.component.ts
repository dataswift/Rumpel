import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UiStateService, AuthService, MarketSquareService, HatApiService } from '../services';
import * as marked from 'marked';

@Component({
  selector: 'rump-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() navigateModal = new EventEmitter<any>();
  public selectedItem: string;
  private sub: any;
  private subNotifs: any;
  public state: any;
  public menu: Array<any>;
  public notifications: Array<any>;
  public selectedNotification: number;
  public unreadNotifications: number;
  public notificationsVisible: boolean;
  private md: any;

  // hack: uiState service needs to be injected befor Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(private uiState: UiStateService,
              private authSvc: AuthService,
              private hat: HatApiService,
              private marketSvc: MarketSquareService) {}

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };
    this.notifications = [];
    this.selectedNotification = 0;
    this.unreadNotifications = 0;
    this.notificationsVisible = false;

    this.md = marked.setOptions({});

    this.menu = [
      { display: 'Dashboard', icon: 'dashboard', link: '', dataType: '', disable: '' },
      { display: 'Profile', icon: 'user', link: 'profile', dataType: 'profile', disable: '' },
      { display: 'Mashup', icon: 'layergroup', link: 'mixpad', dataType: '', disable: '' },
      { display: 'Locations', icon: 'tags', link: 'locations', dataType: 'locations', disable: 'coming 2016' },
      { display: 'Calendar', icon: 'calendar', link: 'calendar', dataType: 'events', disable: 'no data' },
      { display: 'Social', icon: 'replyall', link: 'social', dataType: 'posts', disable: 'no data' },
      { display: 'Photos', icon: 'camera', link: 'photos', dataType: 'photos', disable: 'no data' },
      { display: 'Data Plugs', icon: 'puzzle', link: '', disable: '' },
      { display: 'Offers', icon: 'tags', link: 'https://marketsquare.hubofallthings.com/offers', dataType: null, disable: '' },
      { display: 'Weather', icon: 'thermometer', link: '', dataType: null, disable: '' },
      { display: 'Finance', icon: 'bank', link: '', dataType: null, disable: 'coming soon' },
      { display: 'Creations (music)', icon: 'guitar', link: '', dataType: null, disable: 'coming soon' },
      { display: 'Creations (art)', icon: 'brush', link: '', dataType: null, disable: 'coming soon' },
      //{ display: 'Settings', icon: 'settings', link: '' }
    ];

    this.authSvc.auth$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.hat.getMStoken().subscribe(ms => {

          this.marketSvc.setApplicationToken(ms.accessToken);

          this.subNotifs = this.marketSvc.getNotifications().subscribe(notifications => {
            this.notifications = notifications.map(notification => {
              notification.notice.message = this.md.parse(notification.notice.message);
              return notification;
            });

            for (let not of notifications) {
              if (!not.read) {
                this.unreadNotifications++;
              }
            }
          });
        });
      }
    });

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

  nextNotification() {
    if (this.selectedNotification + 1 === this.notifications.length) {
      this.selectedNotification = 0;
    } else {
      this.selectedNotification++;
    }

    this.markAsRead(this.notifications[this.selectedNotification]);
  }

  previousNotification() {
    if (this.selectedNotification === 0) {
      this.selectedNotification = this.notifications.length - 1;
    } else {
      this.selectedNotification--;
    }

    this.markAsRead(this.notifications[this.selectedNotification]);
  }

  markAsRead(notification: any) {
    if (!notification.read) {
      setTimeout(() => {
        this.marketSvc.markAsRead(notification.notice.id).subscribe(returnValue => {
          if (this.unreadNotifications > 0) {
            this.unreadNotifications--;
          }
        });
      }, 1000);
    }
  }

  showNotifications(event) {
    event.stopPropagation();
    this.notificationsVisible = true;

    setTimeout(() => this.notificationsVisible = false, 10000);
    this.markAsRead(this.notifications[this.selectedNotification]);
  }

  hideNotifications(event) {
    this.notificationsVisible = false;
  }
}
