import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownViewComponent } from './markdown-view.component';
import { MarkdownToHtmlPipe, SafeHtmlPipe } from '../../pipes';
import { HatApiService } from '../../../core/services/hat-api.service';
import { ActivatedRoute } from '@angular/router';
import {of, throwError} from 'rxjs';

describe('MarkdownViewComponent', () => {
  let component: MarkdownViewComponent;
  let fixture: ComponentFixture<MarkdownViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownViewComponent, MarkdownToHtmlPipe, SafeHtmlPipe ],
      providers: [
        { provide: HatApiService, useValue: { getMarkDownContent: (path: string) => {
              return of('test markdown');
            } } },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
