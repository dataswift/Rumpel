import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MixpadComponent } from './mixpad/mixpad.component';

@NgModule({
    imports: [
      RouterModule.forChild([
        { path: 'mixpad', component: MixpadComponent, canActivate: [AuthGuard] }
      ])
    ],
    exports: [
      RouterModule
    ]
})
export class MashupsRoutingModule {}