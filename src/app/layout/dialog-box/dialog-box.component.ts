import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'rump-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  @Input() message: string = `You are now leaving your private Rumpel space. Are you sure? 
                             (You may need to login to Rumpel again if you return unless you have enabled cookies on your web browser).`;
  @Input() buttons: Array<{ title: string; link: string; }> = [];
  private destroy: Function;

  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.destroy();
  }

}
