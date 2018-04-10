import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPlugFeedComponent } from './data-plug-feed.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { SheFeedService } from '../../she/she-feed.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('DataPlugFeedComponent', () => {
  let component: DataPlugFeedComponent;
  let fixture: ComponentFixture<DataPlugFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ DataPlugFeedComponent, MomentPipe, MarkdownToHtmlPipe ],
      providers: [
        { provide: ActivatedRoute, useValue: { parent: { params: Observable.of({ provider: 'test' }) }} },
        { provide: SheFeedService, useValue: { filteredBy$: () => Observable.of([]), getInitData: () => Observable.of(null) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPlugFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
