import { provideRouter, RouterConfig } from '@angular/router';

import { GridComponent } from './dashboard/index';
import { LoginComponent } from './login';
import { LocationsComponent, CalendarComponent, PhotosComponent, MixpadComponent } from './dataViews';

export const routes: RouterConfig = [
  { path: '/dashboard', component: GridComponent },
  { path: '/login', component: LoginComponent },
  { path: '/locations', component: LocationsComponent },
  { path: '/calendar', component: CalendarComponent },
  { path: '/photos', component: PhotosComponent },
  { path: '/mixpad', component: MixpadComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];