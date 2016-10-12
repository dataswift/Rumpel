import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { PhotosComponent } from './photos/photos.component';

const photosRoutes: Routes = [
    { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(photosRoutes);
