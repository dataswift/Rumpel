import { Component, Input, OnInit } from '@angular/core';
import { HatApplicationContent } from '../../explore/hat-application.interface';

@Component({
  selector: 'rum-hmi-baas-content',
  templateUrl: './hmi-baas-content.component.html',
  styleUrls: ['./hmi-baas-content.component.scss']
})
export class HmiBaasContentComponent implements OnInit {
  @Input() app: HatApplicationContent;

  constructor() { }

  ngOnInit() {
  }

}
