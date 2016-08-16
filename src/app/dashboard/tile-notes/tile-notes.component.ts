import { Component, OnInit } from '@angular/core';
import { Moment } from '../../pipes';
import { NotesInputComponent } from '../../shared/components';
import { Note } from '../../shared/interfaces';
import { RumpelService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'rump-tile-notes',
  templateUrl: 'tile-notes.component.html',
  styleUrls: ['tile-notes.component.css'],
  directives: [NotesInputComponent],
  pipes: [Moment]
})
export class TileNotesComponent implements OnInit {
  public notes: Array<Note>;
  private sub: any;

  constructor(private rumpelSvc: RumpelService) {}

  ngOnInit() {
    this.notes =[];

    this.rumpelSvc.loadAll('notes').subscribe(store => {
      this.notes = store.notes;
    });
  }

}
