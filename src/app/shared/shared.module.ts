import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwitchComponent, TreeViewComponent } from './components';
import { OutsideClick } from './directives';
import { MomentPipe, WithObjectPipe } from './pipes';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MomentPipe, WithObjectPipe, OutsideClick, SwitchComponent, TreeViewComponent ],
  exports: [ MomentPipe, WithObjectPipe,
             SwitchComponent, TreeViewComponent,
             OutsideClick,
             CommonModule, RouterModule ]
})
export class SharedModule {}
