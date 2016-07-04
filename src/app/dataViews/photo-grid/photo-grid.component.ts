import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rump-photo-grid',
  templateUrl: 'photo-grid.component.html',
  styleUrls: ['photo-grid.component.css']
})
export class PhotoGridComponent implements OnInit {
  @Input() photoList: Array<any>;

  constructor() {}

  ngOnInit() {
  }

}
