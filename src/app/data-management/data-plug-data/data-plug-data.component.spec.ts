import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugDataComponent } from './data-plug-data.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { DataPlugService } from '../data-plug.service';
import { Observable } from 'rxjs/Observable';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import {ActivatedRoute} from '@angular/router';
import {SheFeedService} from '../../dashboard/she-feed.service';

describe('DataPlugDataComponent', () => {
  let component: DataPlugDataComponent;
  let fixture: ComponentFixture<DataPlugDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, CustomAngularMaterialModule ],
      declarations: [ DataPlugDataComponent, PageHeaderComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: Observable.of({}), snapshot: { firstChild: { url: [{ path: '' }] }} } },
        { provide: SheFeedService, useValue: { filteredBy$: Observable.of([]) } }
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
