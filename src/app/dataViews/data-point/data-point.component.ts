import { Component, OnInit, Input } from '@angular/core';
import { DataPoint } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'rump-data-point',
  templateUrl: 'data-point.component.html',
  styleUrls: ['data-point.component.css']
})
export class DataPointComponent implements OnInit {
  @Input() dp: DataPoint;

  constructor() {}

  ngOnInit() {
  }

}
