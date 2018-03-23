import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDebitListComponent } from './data-debit-list.component';

describe('DataDebitListComponent', () => {
  let component: DataDebitListComponent;
  let fixture: ComponentFixture<DataDebitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDebitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDebitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
