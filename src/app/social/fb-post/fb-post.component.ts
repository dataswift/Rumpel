import { Component, OnInit, Input } from '@angular/core';
import { DataPoint } from '../../shared/data-point.interface';

@Component({
  selector: 'rump-fb-post',
  templateUrl: 'fb-post.component.html',
  styleUrls: ['fb-post.component.scss']
})
export class FbPostComponent implements OnInit {
  @Input() post: DataPoint;

  constructor() {}

  ngOnInit() {
  }

}
