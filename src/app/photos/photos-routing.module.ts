import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
    imports: [
      RouterModule.forChild([
        { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard] }
      ])
    ],
    exports: [
      RouterModule
    ]
})
export class PhotosRoutingModule {}
