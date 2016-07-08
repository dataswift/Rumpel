import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rump-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SideMenuComponent implements OnInit {
  public selectedItem: string;
  public menuItems = [
    { display: 'Dashboard', icon: 'dashboard', link: '' },
    { display: 'Profile', icon: 'user', link: 'profile' },
    //{ display: 'Offers', icon: 'tags', link: '' },
    { display: 'Mashup', icon: 'layergroup', link: 'mixpad' },
    //{ display: 'Messages', icon: 'chats', link: '' },
    { display: 'Locations', icon: 'tags', link: 'locations' },
    { display: 'Calendar', icon: 'calendar', link: 'calendar' },
    { display: 'Social', icon: 'replyall', link: 'social' },
    //{ display: 'Mail', icon: 'send', link: '' },
    { display: 'Photos', icon: 'camera', link: 'photos' }
    //{ display: 'Plugins', icon: 'connection', link: '' },
    //{ display: 'Settings', icon: 'settings', link: '' }
  ];

  constructor() {}

  ngOnInit() {
  }

  onItemSelect(itemName: string) {
    this.selectedItem = itemName;
  }
}
