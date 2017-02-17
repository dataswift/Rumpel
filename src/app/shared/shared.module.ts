/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwitchComponent, TreeViewComponent, TimelineComponent, DateInputComponent } from './components';
import { OutsideClick, StickDirective } from './directives';
import { MomentPipe, FilterByPipe, WithObjectPipe, TimeFilterPipe, LimitContentPipe, ReplaceCharsPipe, RelativeTimePipe,
         MarkdownToHtmlPipe, LimitMembersPipe, RelativeTimesFilterPipe, SafeHtmlPipe } from './pipes';
import {TimeFilterTwoPipe} from "./pipes/time-filter-two.pipe";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {NotableComponent} from "./components/notable/notable.component";

@NgModule({
  imports: [ CommonModule ],

  declarations: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
                  ReplaceCharsPipe, LimitContentPipe, LimitMembersPipe, RelativeTimesFilterPipe,
                  TimeFilterPipe, TimeFilterTwoPipe, SafeHtmlPipe,
                  OutsideClick, StickDirective,
                  SwitchComponent, TreeViewComponent, TimelineComponent, SpinnerComponent,
                  DateInputComponent, NotableComponent],

  exports: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
             ReplaceCharsPipe, LimitContentPipe, LimitMembersPipe, RelativeTimesFilterPipe,
             TimeFilterPipe, TimeFilterTwoPipe, SafeHtmlPipe,
             SwitchComponent, TreeViewComponent, TimelineComponent,
             OutsideClick, StickDirective, SpinnerComponent, DateInputComponent,
             CommonModule, RouterModule, NotableComponent ]
})
export class SharedModule {}
