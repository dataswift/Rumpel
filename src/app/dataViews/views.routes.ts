import { RouterConfig } from '@angular/router';
import { SocialComponent, LocationsComponent, CalendarComponent, PhotosComponent, MixpadComponent } from './index';

export const ViewsRoutes: RouterConfig = [
  { path: 'social', component: SocialComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'mixpad', component: MixpadComponent }
];