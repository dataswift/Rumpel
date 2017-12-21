import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { LocationIos } from '../../shared/interfaces/location.interface';

@Component({
  selector: 'rum-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit {

  @Input() datapoints: Array<LocationIos>;
  private destroy: Function;
  public scrollTop: number;
  public animateIn = false;
  public loading = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.scrollTop = document.body.scrollTop;
    this.animateIn = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  closeModal(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
    document.body.scrollTop = this.scrollTop;

    this.animateIn = false;
    setTimeout(() => {
      this.destroy();
    }, 1000);
  }

}
