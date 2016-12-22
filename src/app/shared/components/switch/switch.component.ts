import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rump-switch',
  templateUrl: 'switch.component.html',
  styleUrls: ['switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() id: string;
  @Input() isChecked: boolean;
  @Input() disabled: boolean;
  @Output() onSwitch: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  toggleSwitch(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.disabled) this.onSwitch.emit(this.id);
  }

}
