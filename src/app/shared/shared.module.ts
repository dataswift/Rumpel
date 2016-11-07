import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwitchComponent, TreeViewComponent, TimelineComponent, ProfilePhotoComponent } from './components';
import { OutsideClick, StickDirective } from './directives';
import { MomentPipe, FilterByPipe, WithObjectPipe, TimeFilterPipe, LimitContentPipe, ReplaceCharsPipe, RelativeTimePipe,
         MarkdownToHtmlPipe, LimitMembersPipe, RelativeTimesFilterPipe } from './pipes';

@NgModule({
  imports: [ CommonModule ],

  declarations: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
                  ReplaceCharsPipe, LimitContentPipe, LimitMembersPipe, RelativeTimesFilterPipe,
                  TimeFilterPipe,
                  OutsideClick, StickDirective,
                  SwitchComponent, TreeViewComponent, ProfilePhotoComponent, TimelineComponent ],

  exports: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
             ReplaceCharsPipe, LimitContentPipe, LimitMembersPipe, RelativeTimesFilterPipe,
             TimeFilterPipe,
             SwitchComponent, TreeViewComponent, ProfilePhotoComponent, TimelineComponent,
             OutsideClick, StickDirective,
             CommonModule, RouterModule ]
})
export class SharedModule {}
