import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { UiStateService } from '../services';

@Component({
  moduleId: module.id,
  selector: 'rump-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SideMenuComponent implements OnInit {
  public selectedItem: string;
  public menu: Array<any>;

  // hack: uiState service needs to be injected befor Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(private uiState: UiStateService) {}

  ngOnInit() {
    this.menu = [
      { display: 'Dashboard', icon: 'dashboard', link: '', dataType: '' },
      { display: 'Profile', icon: 'user', link: 'profile', dataType: 'profile' },
      { display: 'Mashup', icon: 'layergroup', link: 'mixpad', dataType: '' },
      //{ display: 'Messages', icon: 'chats', link: '' },
      { display: 'Locations', icon: 'tags', link: 'locations', dataType: 'locations' },
      { display: 'Calendar', icon: 'calendar', link: 'events', dataType: 'events' },
      { display: 'Social', icon: 'replyall', link: 'posts', dataType: 'posts' },
      //{ display: 'Mail', icon: 'send', link: '' },
      { display: 'Photos', icon: 'camera', link: 'photos', dataType: 'photos' },
      { display: 'Data Plugs', icon: 'merge', link: '' },
      { display: 'Offers', icon: 'tags', link: 'https://marketsquare.hubofallthings.com/offers', dataType: null },
      { display: 'Weather', icon: 'thermometer', link: '', dataType: null },
      { display: 'Finance', icon: 'bank', link: '', dataType: null },
      { display: 'Creations (music)', icon: 'guitar', link: '', dataType: null },
      { display: 'Creations (art)', icon: 'brush', link: '', dataType: null },
      //{ display: 'Settings', icon: 'settings', link: '' }
    ];
  }

  onItemSelect(itemName: string) {
    this.selectedItem = itemName;
  }
}
