import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugDataComponent } from './data-plug-data.component';

describe('DataPlugDataComponent', () => {
  let component: DataPlugDataComponent;
  let fixture: ComponentFixture<DataPlugDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPlugDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlugDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
