import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../layout/dialog.service';
import { MapBoxComponent } from '../../layout/map-box/map-box.component';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Post } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'rump-facebook-view',
  templateUrl: './facebook-view.component.html',
  styleUrls: ['./facebook-view.component.scss']
})
export class FacebookViewComponent implements OnInit {

  @Input() item: HatRecord<any>;

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showMapModal(location) {
    this.dialogSvc.createDialog<MapBoxComponent>(MapBoxComponent, {
      datapoints: [location]
    });
  }

}
