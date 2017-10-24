import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../layout/dialog.service';
import { MapBoxComponent } from '../../layout/map-box/map-box.component';

@Component({
  selector: 'rump-notables-view',
  templateUrl: './notables-view.component.html',
  styleUrls: ['./notables-view.component.scss']
})
export class NotablesViewComponent implements OnInit {

  @Input() public item: any;

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showMapModal(location) {
    this.dialogSvc.createDialog<MapBoxComponent>(MapBoxComponent, {
      datapoints: [location]
    });
  }

}
