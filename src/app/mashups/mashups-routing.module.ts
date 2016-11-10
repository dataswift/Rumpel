import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MyDayComponent } from './my-day/my-day.component';
import { MashupsComponent } from "./mashups/mashups.component";

@NgModule({
    imports: [
      RouterModule.forChild([
        { path: 'mashups', component: MashupsComponent, canActivate: [AuthGuard],
          children: [
            { path: 'myday', component: MyDayComponent }
          ]}
      ])
    ],
    exports: [
      RouterModule
    ]
})
export class MashupsRoutingModule {}