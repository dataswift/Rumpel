import { Component, OnInit, Input } from '@angular/core';
import { DataPoint } from '../../shared';

@Component({
  selector: 'rump-data-point',
  templateUrl: 'data-point.component.html',
  styleUrls: ['data-point.component.scss']
})
export class DataPointComponent implements OnInit {
  @Input() dp: DataPoint;

  constructor() {}

  ngOnInit() {
  }

}
