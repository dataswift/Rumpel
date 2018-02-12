import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugDataComponent } from './data-plug-data.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { DataPlugService } from '../data-plug.service';
import { Observable } from 'rxjs/Observable';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

describe('DataPlugDataComponent', () => {
  let component: DataPlugDataComponent;
  let fixture: ComponentFixture<DataPlugDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, CustomAngularMaterialModule ],
      declarations: [ DataPlugDataComponent, PageHeaderComponent ],
      providers: [
        { provide: DataPlugService, useValue: { dataplugs$: Observable.of([]) } }
      ]
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
