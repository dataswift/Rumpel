import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { SocialComponent } from './social/social.component';

const socialsRoutes: Routes = [
    { path: 'social', component: SocialComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(socialsRoutes);

