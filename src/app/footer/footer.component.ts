import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rump-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class FooterComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
