import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Location } from '../../shared/interfaces';
import { MapComponent } from '../../locations/map/map.component';

declare var $: any;

@Component({
  selector: 'rump-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit {

  @Input() datapoints: Array<Location>;
  private destroy: Function;
  public scrollTop: number;
  public animateIn = false;
  public loading = false;

  constructor() { }

  ngOnInit() {
    this.scrollTop = $('body').scrollTop();
    $('body, html').addClass('no-scroll');
    this.animateIn = true;
  }

  closeModal(): void {
    $('body, html').removeClass('no-scroll');
    $('body').scrollTop(this.scrollTop);

    this.animateIn = false;
    setTimeout( () => {
      this.destroy();
    }, 1000);
  }

}
