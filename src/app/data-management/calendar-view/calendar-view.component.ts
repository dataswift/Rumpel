import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../core/dialog.service';
import { MapBoxComponent } from '../../core/map-box/map-box.component';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Event } from '../../shared/interfaces/event.interface';
import {FitbitActivity} from '../../fitbit/interfaces/fitbit-activity.interface';

@Component({
  selector: 'rum-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  @Input() item: HatRecord<FitbitActivity>;

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showMapModal(location) {
    this.dialogSvc.createDialog<MapBoxComponent>(MapBoxComponent, {
      datapoints: [location]
    });
  }

}
