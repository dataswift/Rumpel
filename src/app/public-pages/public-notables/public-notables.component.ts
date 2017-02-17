import { Component, OnInit } from '@angular/core';
import {HatApiService} from "../../services/hat-api.service";
import {Notable} from "../../shared/interfaces/notable.class";

@Component({
  selector: 'rump-public-notables',
  templateUrl: './public-notables.component.html',
  styleUrls: ['./public-notables.component.scss']
})
export class PublicNotablesComponent implements OnInit {
  private notables: Array<Notable>;

  constructor(private hatSvc: HatApiService) { }

  ngOnInit() {
    this.hatSvc.getPublicData('notables').subscribe((notables: Array<any>) => {
      this.notables = notables.map(note => new Notable(note, note.id))
    })
  }

}
