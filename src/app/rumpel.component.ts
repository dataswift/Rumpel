import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SideMenuComponent } from './side-menu/index';
import { DashboardComponent } from './dashboard/index';
import { LoginComponent } from './login';
import { DataViewComponent } from './data-view';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel.component.html',
  styleUrls: ['rumpel.component.css'],
  directives: [HeaderComponent, FooterComponent, SideMenuComponent, DashboardComponent, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/login', component: LoginComponent},
  {path: '/data-view', component: DataViewComponent}
])
export class RumpelAppComponent {
  title = 'rumpel2 works!';
}
