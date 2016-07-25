import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() navigateModal = new EventEmitter<any>();
  public selectedItem: string;
  private sub: any;
  public state: any;
  public menu: Array<any>;

  // hack: uiState service needs to be injected befor Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(private uiState: UiStateService) {}

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this.menu = [
      { display: 'Dashboard', icon: 'dashboard', link: '', dataType: '', disable: '' },
      { display: 'Profile', icon: 'user', link: 'profile', dataType: 'profile', disable: '' },
      { display: 'Mashup', icon: 'layergroup', link: 'mixpad', dataType: '', disable: '' },
      { display: 'Locations', icon: 'tags', link: 'locations', dataType: 'locations', disable: 'coming 2016' },
      { display: 'Calendar', icon: 'calendar', link: 'events', dataType: 'events', disable: 'no data' },
      { display: 'Social', icon: 'replyall', link: 'posts', dataType: 'posts', disable: 'no data' },
      { display: 'Photos', icon: 'camera', link: 'photos', dataType: 'photos', disable: 'no data' },
      { display: 'Data Plugs', icon: 'puzzle', link: '', disable: '' },
      { display: 'Offers', icon: 'tags', link: 'https://marketsquare.hubofallthings.com/offers', dataType: null, disable: '' },
      { display: 'Weather', icon: 'thermometer', link: '', dataType: null, disable: '' },
      { display: 'Finance', icon: 'bank', link: '', dataType: null, disable: 'coming soon' },
      { display: 'Creations (music)', icon: 'guitar', link: '', dataType: null, disable: 'coming soon' },
      { display: 'Creations (art)', icon: 'brush', link: '', dataType: null, disable: 'coming soon' },
      //{ display: 'Settings', icon: 'settings', link: '' }
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
}
