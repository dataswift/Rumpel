import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareableDataItem } from '../../shared/interfaces/profile.interface';

@Component({
  selector: 'rump-privacy-toggle-helper',
  templateUrl: './privacy-toggle-helper.component.html',
  styleUrls: ['./privacy-toggle-helper.component.scss']
})
export class PrivacyToggleHelperComponent implements OnInit {
  @Input() fieldName: string;
  @Input() field: ShareableDataItem;
  @Output() privacyToggle = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  clicked(event): void {
    event.stopPropagation();
    this.privacyToggle.emit(this.fieldName.split('.'))
  }

}
