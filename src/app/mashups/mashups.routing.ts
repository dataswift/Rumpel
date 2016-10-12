import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MixpadComponent } from './mixpad/mixpad.component';

const mashupsRoutes: Routes = [
    { path: 'mixpad', component: MixpadComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(mashupsRoutes);
