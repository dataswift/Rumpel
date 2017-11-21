import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookEventViewComponent } from './facebook-event-view.component';

describe('FacebookEventViewComponent', () => {
  let component: FacebookEventViewComponent;
  let fixture: ComponentFixture<FacebookEventViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookEventViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
