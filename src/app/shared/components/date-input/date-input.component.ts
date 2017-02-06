import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rump-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  private _day;
  private _month;
  private _year;
  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  setDay(val) {
    this._day = parseInt(val, 10);
    this.propagateChange(moment([this._year, this._month, this._day ]));
  }

  setMonth(val) {
    this._month = parseInt(val, 10) - 1;
    this.propagateChange(moment([this._year, this._month, this._day ]));
  }

  setYear(val) {
    this._year = parseInt(val, 10);
    this.propagateChange(moment([this._year, this._month, this._day ]));
  }

  writeValue(value: string) {
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
