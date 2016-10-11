import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ProfileComponent } from './profile/profile.component';

const profilesRoutes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(profilesRoutes);
