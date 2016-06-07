import { Component } from '@angular/core';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SideMenuComponent } from './side-menu/index';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel.component.html',
  styleUrls: ['rumpel.component.css'],
  directives: [HeaderComponent, FooterComponent, SideMenuComponent]
})
export class RumpelAppComponent {
  title = 'rumpel2 works!';
}
