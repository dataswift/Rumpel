import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedComponent } from './she-feed.component';

describe('SheFeedComponent', () => {
  let component: SheFeedComponent;
  let fixture: ComponentFixture<SheFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
