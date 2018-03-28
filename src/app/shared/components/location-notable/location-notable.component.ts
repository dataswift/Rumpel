import { Component, OnInit, Input, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { Notable } from '../../interfaces/notable.class';
import { HatRecord } from '../../interfaces/hat-record.interface';

@Component({
  selector: 'rum-location-notable',
  templateUrl: './location-notable.component.html',
  styleUrls: ['./location-notable.component.scss']
})
export class LocationNotableComponent implements OnInit {
  @Input() notable: HatRecord<Notable>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
  }


}
