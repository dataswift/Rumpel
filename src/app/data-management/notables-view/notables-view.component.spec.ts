import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotablesViewComponent } from './notables-view.component';

describe('NotablesViewComponent', () => {
  let component: NotablesViewComponent;
  let fixture: ComponentFixture<NotablesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotablesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotablesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
