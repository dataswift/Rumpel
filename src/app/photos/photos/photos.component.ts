import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';
import { Photo } from '../../shared/interfaces';

@Component({
  selector: 'rump-photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public images: Array<Photo>;
  private _sub;

  constructor(private _photosSvc: PhotosService) {}

  ngOnInit() {
    this.images = [];
    this._sub = this._photosSvc.images$.subscribe(image => {
      this.images.push(image);
    });

    this._photosSvc.loadAll();
  }

}
