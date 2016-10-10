import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwitchComponent, TreeViewComponent, ProfilePhotoComponent } from './components';
import { OutsideClick } from './directives';
import { MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe } from './pipes';

@NgModule({
  imports: [ CommonModule ],

  declarations: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
                  OutsideClick,
                  SwitchComponent, TreeViewComponent, ProfilePhotoComponent ],

  exports: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
             SwitchComponent, TreeViewComponent, ProfilePhotoComponent,
             OutsideClick,
             CommonModule, RouterModule ]
})
export class SharedModule {}
