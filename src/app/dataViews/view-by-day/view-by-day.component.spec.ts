import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ViewByDayComponent } from './view-by-day.component';

describe('Component: ViewByDay', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ViewByDayComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ViewByDayComponent],
      (component: ViewByDayComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ViewByDayComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ViewByDayComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <rump-view-by-day></rump-view-by-day>
  `,
  directives: [ViewByDayComponent]
})
class ViewByDayComponentTestController {
}

