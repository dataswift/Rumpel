import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugsComponent } from './data-plugs.component';

describe('DataPlugsComponent', () => {
  let component: DataPlugsComponent;
  let fixture: ComponentFixture<DataPlugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPlugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
