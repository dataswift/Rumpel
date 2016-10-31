import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../shared/interfaces';

@Component({
  selector: 'rump-fb-post',
  templateUrl: 'fb-post.component.html',
  styleUrls: ['fb-post.component.scss']
})
export class FbPostComponent implements OnInit {
  @Input() post: Post;

  constructor() {}

  ngOnInit() {
  }

}
