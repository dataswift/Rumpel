import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedItemComponent } from './she-feed-item.component';

describe('SheFeedItemComponent', () => {
  let component: SheFeedItemComponent;
  let fixture: ComponentFixture<SheFeedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheFeedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
