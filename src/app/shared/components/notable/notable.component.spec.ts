/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotableComponent } from './notable.component';
import { APP_CONFIG } from '../../../app.config';
import { MomentPipe } from '../../pipes/moment.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { MarkdownToHtmlPipe } from '../../pipes/markdown-to-html.pipe';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { PresignImgUrlPipe } from '../../pipes/presign-img-url.pipe';
import { HatApiService } from '../../../core/services/hat-api.service';
import { of } from 'rxjs';
import { Notable } from '../../interfaces/notable.class';

const NOTABLE_MOCK_DATA = {
  'endpoint': 'rumpel/notablesv1',
  'recordId': '2f98c219-f990-45ab-9587-ddef0c10408c',
  'data': new Notable({
    'kind': 'note',
    'shared': false,
    'message': 'Location test by Gus',
    'authorv1': {
      'name': '',
      'phata': 'testing.hubat.net',
      'nickname': '',
      'photo_url': ''
    },
    'shared_on': [],
    'locationv1': {
      'latitude': 51.528293609619141,
      'longitude': -0.090052776038646698,
    },
    'created_time': '2018-03-14T14:09:52Z',
    'updated_time': '2018-03-14T14:09:52Z',
    'currently_shared': false
  })
};

describe('NotableComponent', () => {
  let component: NotableComponent;
  let fixture: ComponentFixture<NotableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotableComponent, MomentPipe, SafeHtmlPipe, MarkdownToHtmlPipe, RelativeTimePipe, PresignImgUrlPipe ],
      providers: [
        { provide: APP_CONFIG, useValue: { notables: { iconMap: {} } } },
        { provide: HatApiService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotableComponent);
    component = fixture.componentInstance;
    component.notable = NOTABLE_MOCK_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
