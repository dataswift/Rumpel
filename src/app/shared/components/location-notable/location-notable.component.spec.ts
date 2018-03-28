/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationNotableComponent } from './location-notable.component';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { MomentPipe } from '../../pipes/moment.pipe';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { MarkdownToHtmlPipe } from '../../pipes/markdown-to-html.pipe';
import { APP_CONFIG } from '../../../app.config';
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

describe('LocationNotableComponent', () => {
  let component: LocationNotableComponent;
  let fixture: ComponentFixture<LocationNotableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationNotableComponent, SafeHtmlPipe, MarkdownToHtmlPipe, MomentPipe, RelativeTimePipe ],
      providers: [
        { provide: APP_CONFIG, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationNotableComponent);
    component = fixture.componentInstance;
    component.notable = NOTABLE_MOCK_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
