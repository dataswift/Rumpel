import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsListComponent } from './tools-list.component';
import {SharedModule} from '../../shared/shared.module';
import {CustomAngularMaterialModule} from '../../core/custom-angular-material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {HatToolsService} from '../hat-tools.service';

describe('ToolsListComponent', () => {
  let component: ToolsListComponent;
  let fixture: ComponentFixture<ToolsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, CustomAngularMaterialModule, RouterTestingModule ],
      declarations: [ ToolsListComponent ],
      providers: [
        { provide: HatToolsService, useValue: { getToolList: () => of([]) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
