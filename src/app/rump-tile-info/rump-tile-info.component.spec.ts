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
import { RumpTileInfoComponent } from './rump-tile-info.component';

describe('Component: RumpTileInfo', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RumpTileInfoComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([RumpTileInfoComponent],
      (component: RumpTileInfoComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(RumpTileInfoComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(RumpTileInfoComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-rump-tile-info></app-rump-tile-info>
  `,
  directives: [RumpTileInfoComponent]
})
class RumpTileInfoComponentTestController {
}

