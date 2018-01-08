import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugFeedComponent } from './data-plug-feed.component';

describe('DataPlugFeedComponent', () => {
  let component: DataPlugFeedComponent;
  let fixture: ComponentFixture<DataPlugFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPlugFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlugFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
