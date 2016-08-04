import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rump-switch',
  templateUrl: 'switch.component.html',
  styleUrls: ['switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() id: string;
  @Input() isChecked: boolean;
  @Input() disabled: boolean;
  @Output() onSwitch: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  toggleSwitch() {
    if (!this.disabled) this.onSwitch.emit(this.id);
  }

}
