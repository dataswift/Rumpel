import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services';
import { Moment, LimitMembersPipe } from '../../pipes';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-generic',
  templateUrl: 'tile-generic.component.html',
  styleUrls: ['tile-generic.component.css'],
  pipes: [Moment, LimitMembersPipe]
})
export class TileGenericComponent implements OnInit {
  public events$;

  constructor(private eventsSvc: EventsService) {}

  ngOnInit() {
    this.events$ = this.eventsSvc.getEvents$();
  }

}
