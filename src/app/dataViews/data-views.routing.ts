import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { PhotosComponent } from './index';

export const dataViewsRoutes: Routes = [
  { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] }
];

// export const dataViewsRouting = RouterModule.forChild(dataViewsRoutes);
