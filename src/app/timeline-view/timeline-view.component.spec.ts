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
import { TimelineViewComponent } from './timeline-view.component';

describe('Component: TimelineView', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [TimelineViewComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([TimelineViewComponent],
      (component: TimelineViewComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(TimelineViewComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(TimelineViewComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <rump-timeline-view></rump-timeline-view>
  `,
  directives: [TimelineViewComponent]
})
class TimelineViewComponentTestController {
}

