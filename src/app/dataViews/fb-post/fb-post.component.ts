import { Component, OnInit, Input } from '@angular/core';
import { ReplaceCharsPipe, Moment } from '../../pipes';
import { DataPoint } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'rump-fb-post',
  templateUrl: 'fb-post.component.html',
  styleUrls: ['fb-post.component.css'],
  pipes: [ReplaceCharsPipe, Moment]
})
export class FbPostComponent implements OnInit {
  @Input() post: DataPoint;

  constructor() {}

  ngOnInit() {
  }

}
