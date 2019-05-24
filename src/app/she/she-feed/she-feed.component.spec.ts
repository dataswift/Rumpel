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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SheFeedScrollingService } from './she-feed-scrolling.service';

const SHE_FEED_MOCK = [    {
  'source': 'spotify',
  'date': {
    'iso': '2019-05-23T18:51:20.018Z',
    'unix': 1558637480
  },
  'types': [],
  'title': {
    'text': 'You listened',
    'action': '03:34'
  },
  'content': {
    'text': 'Dead But Rising,\nVolbeat,\nOutlaw Gentlemen & Shady Ladies',
    'media': [
      {
        'thumbnail': 'https://i.scdn.co/image/851f7d7dffae5b858b1665d555ed41f0178020af',
        'url': 'https://i.scdn.co/image/851f7d7dffae5b858b1665d555ed41f0178020af'
      }
    ]
  }
},
  {
    'source': 'spotify',
    'date': {
      'iso': '2019-05-23T18:49:40.385Z',
      'unix': 1558637380
    },
    'types': [],
    'title': {
      'text': 'You listened',
      'action': '03:41'
    },
    'content': {
      'text': 'My Body,\nVolbeat,\nOutlaw Gentlemen & Shady Ladies (Deluxe Version)',
      'media': [
        {
          'thumbnail': 'https://i.scdn.co/image/851f7d7dffae5b858b1665d555ed41f0178020af',
          'url': 'https://i.scdn.co/image/851f7d7dffae5b858b1665d555ed41f0178020af'
        }
      ]
    }
  }];


describe('SheFeedComponent', () => {
  let component: SheFeedComponent;
  let fixture: ComponentFixture<SheFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, SheFeedWeeklySummaryModule, NgxDaterangepickerMd, InfiniteScrollModule ],
      declarations: [ SheFeedComponent,
        SheFeedRollupComponent,
        SheFeedItemComponent,
        MarkdownToHtmlPipe,
        MomentPipe ],
      providers: [ { provide: SheFeedService, useValue: {
          getInitFeed: () => of([]),
          getMoreData: () => of([])
        }}, { provide: SheFeedScrollingService, useValue: {
          init: () => {},
        }
        }]
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
