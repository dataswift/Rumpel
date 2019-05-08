import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedComponent } from './she-feed.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { SheFeedService } from '../she-feed.service';
import { of } from 'rxjs';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { SheFeedItemComponent } from '../../shared/components/she-feed-item/she-feed-item.component';
import { SheFeedRollupComponent } from '../she-feed-rollup/she-feed-rollup.component';
import { SheFeedWeeklySummaryModule } from '../../shared/components/she-feed-weekly-summary/she-feed-weekly-summary.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


describe('SheFeedComponent', () => {
  let component: SheFeedComponent;
  let fixture: ComponentFixture<SheFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, SheFeedWeeklySummaryModule, NgxDaterangepickerMd ],
      declarations: [ SheFeedComponent,
        SheFeedRollupComponent,
        SheFeedItemComponent,
        MarkdownToHtmlPipe,
        MomentPipe ],
      providers: [ { provide: SheFeedService, useValue: {
        getInitData: () => of([]),
        getInitFeed: () => of([])
      }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
