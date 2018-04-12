import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPageHeaderComponent } from './graphic-page-header.component';

describe('GraphicPageHeaderComponent', () => {
  let component: GraphicPageHeaderComponent;
  let fixture: ComponentFixture<GraphicPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
