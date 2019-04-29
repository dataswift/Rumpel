import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rum-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
  @Input() title: string;
  @Input() listData: string[][];
  @Input() expandable = false;

  constructor() { }

  ngOnInit() {
  }
}
