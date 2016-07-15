import { RouterConfig } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { DataGuard } from '../data.guard';
import { SocialComponent, LocationsComponent, CalendarComponent, PhotosComponent, MixpadComponent, ProfileComponent } from './index';

export const ViewsRoutes: RouterConfig = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: SocialComponent, canActivate: [AuthGuard, DataGuard] },
  { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard, DataGuard] },
  { path: 'events', component: CalendarComponent, canActivate: [AuthGuard, DataGuard] },
  { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard, DataGuard] },
  { path: 'mixpad', component: MixpadComponent, canActivate: [AuthGuard] }
];