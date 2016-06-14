import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES , ROUTER_PROVIDERS} from '@angular/router';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SideMenuComponent } from './side-menu/index';
import { GridComponent } from './dashboard/index';
import { LoginComponent } from './login';
//import { DataViewComponent } from './data-view';
import { LocationsComponent, CalendarComponent, PhotosComponent, MixpadComponent } from './dataViews';

@Component({
  moduleId: module.id,
  selector: 'rumpel',
  templateUrl: 'rumpel.component.html',
  styleUrls: ['rumpel.component.css'],
  directives: [HeaderComponent, FooterComponent, SideMenuComponent, GridComponent, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/login', component: LoginComponent},
  {path: '/locations', component: LocationsComponent},
  {path: '/calendar', component: CalendarComponent},
  {path: '/photos', component: PhotosComponent},
  {path: '/mixpad', component: MixpadComponent}
])
export class RumpelAppComponent {
  title = 'rumpel2 works!';
}
