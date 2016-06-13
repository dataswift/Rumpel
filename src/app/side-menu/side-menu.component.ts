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

  constructor() {}

  ngOnInit() {
  }

}
