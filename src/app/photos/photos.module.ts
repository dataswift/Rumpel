import { NgModule } from '@angular/core';

import { routing } from './photos.routing';
import { SharedModule } from '../shared/shared.module';

import { PhotoGridComponent } from './photo-grid/photo-grid.component';
import { PhotosComponent } from './photos/photos.component';

import { PhotosService } from './photos.service';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [ PhotoGridComponent, PhotosComponent ],
    providers: [ PhotosService ]
})
export class PhotosModule {}