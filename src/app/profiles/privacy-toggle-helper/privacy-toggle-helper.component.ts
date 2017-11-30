import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rump-privacy-toggle-helper',
  templateUrl: './privacy-toggle-helper.component.html',
  styleUrls: ['./privacy-toggle-helper.component.scss']
})
export class PrivacyToggleHelperComponent implements OnInit {
  @Input() fieldName: string;
  @Input() shared: boolean;
  @Output() privacyToggle = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  clicked(event): void {
    event.stopPropagation();
    this.privacyToggle.emit(this.fieldName.split('.'))
  }

}
