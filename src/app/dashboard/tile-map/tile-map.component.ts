import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { MapComponent } from '../../dataViews/map/map.component';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-map',
  templateUrl: 'tile-map.component.html',
  styleUrls: ['tile-map.component.css'],
  directives: [MapComponent]
})
export class TileMapComponent implements OnInit {
  @Input() title;
  @Input() iconName;
  public safeSize;

  constructor(private sanitizer: DomSanitizationService) {}

  ngOnInit() {
    this.safeSize = this.sanitizer.bypassSecurityTrustStyle('29em');
  }

}
