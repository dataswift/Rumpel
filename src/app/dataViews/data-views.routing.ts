import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CalendarComponent, PhotosComponent, MixpadComponent, ProfileComponent } from './index';

export const dataViewsRoutes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] },
  { path: 'mixpad', component: MixpadComponent, canActivate: [AuthGuard] }
];

// export const dataViewsRouting = RouterModule.forChild(dataViewsRoutes);