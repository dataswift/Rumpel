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
import { RumpSideMenuComponent } from './rump-side-menu.component';

describe('Component: RumpSideMenu', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RumpSideMenuComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([RumpSideMenuComponent],
      (component: RumpSideMenuComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(RumpSideMenuComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(RumpSideMenuComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-rump-side-menu></app-rump-side-menu>
  `,
  directives: [RumpSideMenuComponent]
})
class RumpSideMenuComponentTestController {
}

