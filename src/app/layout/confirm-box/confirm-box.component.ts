import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'rump-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {
  @Input() message: string = ``;
  @Input() accept: () => void = () => {};
  @Input() reject: () => void = () => {};
  private destroy: Function;

  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.destroy();
  }

}
