import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDebitListComponent } from './data-debit-list.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HatApiService } from '../../core/services/hat-api.service';
import { Observable } from 'rxjs/Observable';
import { GraphicPageHeaderComponent } from '../../shared/components/graphic-page-header/graphic-page-header.component';

xdescribe('DataDebitListComponent', () => {
  let component: DataDebitListComponent;
  let fixture: ComponentFixture<DataDebitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, RouterTestingModule ],
      declarations: [ DataDebitListComponent, GraphicPageHeaderComponent ],
      providers: [{ provide: HatApiService, useValue: { getAllDataDebits: () => Observable.of([]) } }]
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
