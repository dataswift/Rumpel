import { RouterConfig } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { SocialComponent, LocationsComponent, CalendarComponent, PhotosComponent, MixpadComponent } from './index';

export const ViewsRoutes: RouterConfig = [
  { path: 'social', component: SocialComponent, canActivate: [AuthGuard] },
  { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] },
  { path: 'mixpad', component: MixpadComponent, canActivate: [AuthGuard] }
];