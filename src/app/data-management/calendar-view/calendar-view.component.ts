import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../layout/dialog.service';
import { MapBoxComponent } from '../../layout/map-box/map-box.component';
import { HatRecord } from '../../shared/interfaces/hat-record.interface';
import { Event } from '../../shared/interfaces/event.interface';

@Component({
  selector: 'rump-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  @Input() item: HatRecord<Event>;

  constructor(private dialogSvc: DialogService) { }

  ngOnInit() {
  }

  showMapModal(location) {
    this.dialogSvc.createDialog<MapBoxComponent>(MapBoxComponent, {
      datapoints: [location]
    });
  }

}
