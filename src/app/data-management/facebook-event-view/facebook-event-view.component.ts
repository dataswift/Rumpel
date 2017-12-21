import { Component, Input, OnInit } from '@angular/core';
import { MapBoxComponent } from '../../core/map-box/map-box.component';
import { DialogService } from '../../core/dialog.service';

@Component({
  selector: 'rum-facebook-event-view',
  templateUrl: './facebook-event-view.component.html',
  styleUrls: ['./facebook-event-view.component.scss']
})
export class FacebookEventViewComponent implements OnInit {

  @Input() item: any;

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showMapModal(location) {
    const wrapperLocation = { data: location };
    this.dialogSvc.createDialog<MapBoxComponent>(MapBoxComponent, {
      datapoints: [wrapperLocation]
    });
  }

}
