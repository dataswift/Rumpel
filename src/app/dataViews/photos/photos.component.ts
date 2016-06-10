import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['photos.component.css']
})
export class PhotosComponent implements OnInit {
  images$;

  constructor(private _imageSvc: ImagesService) {}

  ngOnInit() {
    this.images$ = this._imageSvc.images$;

    this._imageSvc.loadAll();
  }

}
