import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LocationsComponent } from './locations/locations.component';

const locationsRoutes: Routes = [
    { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(locationsRoutes);
