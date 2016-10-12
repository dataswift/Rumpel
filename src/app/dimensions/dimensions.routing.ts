import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CalendarComponent } from './calendar/calendar.component';

const locationsRoutes: Routes = [
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(locationsRoutes);

