import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersHomeComponent } from './offers-home.component';

describe('OffersHomeComponent', () => {
  let component: OffersHomeComponent;
  let fixture: ComponentFixture<OffersHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
