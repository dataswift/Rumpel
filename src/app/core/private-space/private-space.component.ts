import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rump-private-space',
  templateUrl: './private-space.component.html',
  styleUrls: ['./private-space.component.scss']
})
export class PrivateSpaceComponent implements OnInit {
  public isPublicPage = false;

  constructor() { }

  ngOnInit() {
  }

}
