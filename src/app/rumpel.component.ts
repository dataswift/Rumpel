import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SideMenuComponent } from './side-menu/index';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel.component.html',
  styleUrls: ['rumpel.component.css'],
  directives: [HeaderComponent, FooterComponent, SideMenuComponent, ROUTER_DIRECTIVES, MODAL_DIRECTIVES]
})
export class RumpelAppComponent implements OnInit {
  title = 'rumpel2 works!';
  @ViewChild('modal') modal: ModalComponent;
  private link: string;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log("Rumpel is running. Version: 0.0.1");
  }

  setModalLink(link: string) {
    this.link = link;
    this.modal.open();
  }

  navigateTo() {
    window.location.href = this.link;
  }
}
