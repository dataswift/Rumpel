import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OutsideClick } from './directives';

import { MomentPipe } from './pipes';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MomentPipe, OutsideClick ],
  exports: [ MomentPipe,
             OutsideClick,
             CommonModule, RouterModule ]
})
export class SharedModule {}
