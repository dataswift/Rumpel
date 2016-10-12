import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rump-photo-grid',
  templateUrl: 'photo-grid.component.html',
  styleUrls: ['photo-grid.component.scss']
})
export class PhotoGridComponent implements OnInit {
  @Input() photoList: Array<any>;

  constructor() {}

  ngOnInit() {
  }

}
