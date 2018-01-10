import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Moment } from 'moment';

import * as moment from 'moment';

@Component({
  selector: 'rum-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {
  @Input() dayList: HatRecord<any>[];
  @Input() date: string;
  @Input() index: number;
  @Input() isSelected: boolean;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  get momentDate(): Moment {
    return moment(this.date);
  }

  scrollToItem(index: number) {
    this.selection.emit(index);
  }
}
