import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services';
import { Image } from '../../shared';

@Component({
  selector: 'rump-photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public images: Array<Image>;
  private _sub;

  constructor(private _imageSvc: ImagesService) {}

  ngOnInit() {
    this.images = [];
    this._sub = this._imageSvc.images$.subscribe(image => {
      this.images = this.images.concat(image);
    });

    this._imageSvc.loadAll();
  }

}
