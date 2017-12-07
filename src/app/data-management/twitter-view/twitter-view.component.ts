import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../core/dialog.service';
import { MapBoxComponent } from '../../core/map-box/map-box.component';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Tweet } from '../../shared/interfaces/tweet.interface';

@Component({
  selector: 'rump-twitter-view',
  templateUrl: './twitter-view.component.html',
  styleUrls: ['./twitter-view.component.scss']
})
export class TwitterViewComponent implements OnInit {

  @Input() item: HatRecord<Tweet>;

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showMapModal(location) {
    this.dialogSvc.createDialog<MapBoxComponent>(MapBoxComponent, {
      datapoints: [location]
    });
  }

}
