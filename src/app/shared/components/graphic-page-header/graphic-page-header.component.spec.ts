import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPageHeaderComponent } from './graphic-page-header.component';
import { CustomAngularMaterialModule } from '../../../core/custom-angular-material.module';

describe('GraphicPageHeaderComponent', () => {
  let component: GraphicPageHeaderComponent;
  let fixture: ComponentFixture<GraphicPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
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
