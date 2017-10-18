import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'rump-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {

  @Input() day: any;
  @Input() i: any;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  scrollToItem(num: number) {
    this.selection.emit(num);
  }
}
