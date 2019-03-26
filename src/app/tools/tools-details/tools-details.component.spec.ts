import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsDetailsComponent } from './tools-details.component';
import {CustomAngularMaterialModule} from '../../core/custom-angular-material.module';
import {SharedModule} from '../../shared/shared.module';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HatToolsService} from '../hat-tools.service';
import {of} from 'rxjs';
import {HatTool} from '../hat-tools.interface';

const TOOL_MOCK: HatTool = {
  'id': 'data-feed-counter',
  'info': {
    'version': '1.0.0',
    'versionReleaseDate': '2018-01-01T12:00:00.000Z',
    'name': 'Weekly Summary',
    'headline': 'A summary of your week’s digital activities',
    'description': {
      'text': 'Weekly Summary shows your weekly onle of the tool and is a summary of your history of activities.',
      'markdown': '',
      'html': ''
    },
    'termsUrl': 'https://hatdex.org/terms-of-service-hat-owner-agreement',
    'supportContact': 'contact@hatdex.org',
    'graphics': {
      'banner': {
        'normal': ''
      },
      'logo': {
        'normal': 'https://github.com/Hub-of-all-Things/exchange-assets/blob/master/insights-activity-summary/logo.png?raw=true'
      },
      'screenshots': [
        {
          'normal': 'https://github.com/Hub-of-all-Things/exchange-assets/blob/master/insights-activity-summary/screenshot1.jpg?raw=true'
        },
        {
          'normal': 'https://github.com/Hub-of-all-Things/exchange-assets/blob/master/insights-activity-summary/screenshot2.jpg?raw=true'
        }
      ]
    },
    'dataPreviewEndpoint': '/she/feed/she/activity-records'
  },
  'developer': {
    'id': 'hatdex',
    'name': 'HAT Data Exchange Ltd',
    'url': 'https://hatdex.org',
    'country': 'United Kingdom'
  },
  'trigger': {
    'period': 'P1W',
    'triggerType': 'periodic'
  },
  'dataBundle': {
    'name': 'data-feed-counter',
    'bundle': {
      'she/insights/emotions': {
        'endpoints': [
          {
            'endpoint': 'she/insights/emotions'
          }
        ],
        'orderBy': 'timestamp',
        'ordering': 'descending'
      },
      'monzo/transactions': {
        'endpoints': [
          {
            'endpoint': 'monzo/transactions'
          }
        ],
        'orderBy': 'created',
        'ordering': 'descending'
      },
      'calendar/google/events': {
        'endpoints': [
          {
            'endpoint': 'calendar/google/events',
            'mapping': {
              'id': 'id'
            },
            'filters': []
          },
          {
            'endpoint': 'calendar/google/events',
            'mapping': {
              'id': 'id'
            },
            'filters': []
          }
        ],
        'orderBy': 'start.dateTime',
        'ordering': 'descending'
      },
      'notables/feed': {
        'endpoints': [
          {
            'endpoint': 'rumpel/notablesv1'
          }
        ],
        'orderBy': 'created_time',
        'ordering': 'descending'
      },
      'fitbit/activity': {
        'endpoints': [
          {
            'endpoint': 'fitbit/activity'
          }
        ],
        'orderBy': 'originalStartTime',
        'ordering': 'descending'
      },
      'she/insights/emotions/negative': {
        'endpoints': [
          {
            'endpoint': 'she/insights/emotions'
          }
        ],
        'orderBy': 'timestamp',
        'ordering': 'descending'
      },
      'twitter/tweets': {
        'endpoints': [
          {
            'endpoint': 'twitter/tweets',
            'mapping': {
              'id': 'id_str'
            }
          }
        ],
        'orderBy': 'lastUpdated',
        'ordering': 'descending'
      },
      'fitbit/sleep': {
        'endpoints': [
          {
            'endpoint': 'fitbit/sleep'
          }
        ],
        'orderBy': 'endTime',
        'ordering': 'descending'
      },
      'spotify/feed': {
        'endpoints': [
          {
            'endpoint': 'spotify/feed'
          }
        ],
        'orderBy': 'played_at',
        'ordering': 'descending'
      },
      'facebook/feed': {
        'endpoints': [
          {
            'endpoint': 'facebook/feed',
            'mapping': {
              'id': 'id'
            }
          }
        ],
        'orderBy': 'created_time',
        'ordering': 'descending'
      },
      'she/insights/emotions/neutral': {
        'endpoints': [
          {
            'endpoint': 'she/insights/emotions'
          }
        ],
        'orderBy': 'timestamp',
        'ordering': 'descending'
      },
      'she/insights/emotions/positive': {
        'endpoints': [
          {
            'endpoint': 'she/insights/emotions'
          }
        ],
        'orderBy': 'timestamp',
        'ordering': 'descending'
      },
      'fitbit/weight': {
        'endpoints': [
          {
            'endpoint': 'fitbit/weight'
          }
        ],
        'orderBy': 'date',
        'ordering': 'descending'
      }
    }
  },
  'status': {
    'available': true,
    'enabled': true,
    'lastExecution': '2019-03-21T10:32:06.450Z'
  }
};
const TOOL_MOCK_ARRAY: HatTool[] = [TOOL_MOCK];


describe('ToolsDetailsComponent', () => {
  let component: ToolsDetailsComponent;
  let fixture: ComponentFixture<ToolsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, SharedModule ],
      declarations: [ ToolsDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { 'params': of([{ 'toolId': 'tools' }]) } },

        { provide: Location, useValue: { } },
        { provide: HatToolsService, useValue: { getToolList: () => of(TOOL_MOCK_ARRAY) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
