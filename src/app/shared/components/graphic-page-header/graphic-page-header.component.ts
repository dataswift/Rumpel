import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rum-graphic-page-header',
  templateUrl: './graphic-page-header.component.html',
  styleUrls: ['./graphic-page-header.component.scss']
})
export class GraphicPageHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() headline: string;
  @Input() matIcon: string;

  constructor() { }

  ngOnInit() {
  }

}
