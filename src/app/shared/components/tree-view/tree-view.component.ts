import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../interfaces/node.class';

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  @Input() treeNodes: Array<Node>;
  @Input() offset: number;

  constructor() { }

  ngOnInit() {
  }

}
