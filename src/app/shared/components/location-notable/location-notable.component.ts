import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../app.config';
import { Notable } from '../../interfaces/notable.class';

@Component({
  selector: 'rump-location-notable',
  templateUrl: './location-notable.component.html',
  styleUrls: ['./location-notable.component.scss']
})
export class LocationNotableComponent implements OnInit {
  @Input() notable: Notable;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
  }


}
