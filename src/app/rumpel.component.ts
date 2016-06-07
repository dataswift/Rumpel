import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SideMenuComponent } from './side-menu/index';
import { LoginComponent } from './login';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel.component.html',
  styleUrls: ['rumpel.component.css'],
  directives: [HeaderComponent, FooterComponent, SideMenuComponent, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/login', component: LoginComponent}
])
export class RumpelAppComponent {
  title = 'rumpel2 works!';
}
