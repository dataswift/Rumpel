import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookViewComponent } from './facebook-view.component';

describe('FacebookViewComponent', () => {
  let component: FacebookViewComponent;
  let fixture: ComponentFixture<FacebookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
