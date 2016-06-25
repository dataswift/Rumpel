import { Component, OnInit } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { ImagesService } from '../../services';
import { Image } from '../../shared';
import { Moment } from '../../pipes/moment.pipe';

@Component({
  moduleId: module.id,
  selector: 'rump-photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['photos.component.css'],
  pipes: [Moment]
})
export class PhotosComponent implements OnInit {
  public images: Array<Image>;
  private _sub;

  constructor(private _imageSvc: ImagesService,
              private _sanitizer: DomSanitizationService) {}

  ngOnInit() {
    this.images = [];
    this._sub = this._imageSvc.images$.subscribe(image => {
      image.url = this._sanitizer.bypassSecurityTrustUrl(image.url);
      this.images.push(image);
    });

    this._imageSvc.loadAll();
  }

}
