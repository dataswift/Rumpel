import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../core/dialog.service';
import { MapBoxComponent } from '../../core/map-box/map-box.component';
import {HatRecord} from '../../shared/interfaces/hat-record.interface';
import {FitbitActivitySummary} from '../../fitbit/interfaces/fitbit-activity-summary.interface';

@Component({
  selector: 'rum-photos-view',
  templateUrl: './photos-view.component.html',
  styleUrls: ['./photos-view.component.scss']
})
export class PhotosViewComponent implements OnInit {

  @Input() public item: HatRecord<FitbitActivitySummary>;

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showMapModal(location) {
    this.dialogSvc.createDialog<MapBoxComponent>(MapBoxComponent, {
      datapoints: [location]
    });
  }

}
