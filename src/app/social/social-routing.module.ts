import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { SocialComponent } from './social/social.component';

@NgModule({
    imports: [
      RouterModule.forChild([
        { path: 'social', component: SocialComponent, canActivate: [AuthGuard] }
      ])
    ],
    exports: [
      RouterModule
    ]
})
export class SocialRoutingModule {}

