import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiDaasContentComponent } from './hmi-daas-content.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HatApplication } from '../../explore/hat-application.interface';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { HmiDataPlugComponent } from '../hmi-shared-components/hmi-data-plug/hmi-data-plug.component';
import { HmiDataDebitComponent } from '../hmi-shared-components/hmi-data-debit/hmi-data-debit.component';
import { HmiRatingComponent } from '../hmi-shared-components/hmi-rating/hmi-rating.component';
import { UnbundlePipe } from '../../shared/pipes/unbundle.pipe';
import { HmiPermissionsListComponent } from '../hmi-permissions-list/hmi-permissions-list.component';
import { SafeHtmlPipe } from '../../shared/pipes';
import { HmiPermissionsDialogComponent } from '../hmi-permissions-dialog/hmi-permissions-dialog.component';

const APP_DATA_MOCK: HatApplication = {
  'application': {
    'id': 'parent-app',
    'kind': {
      'url': '',
      'kind': 'App',
      'iosUrl': ''
    },
    'info': {
      'version': '0.0.1',
      'published': false,
      'name': 'Parent App',
      'headline': '',
      'description': {
        'text': '',
        'markdown': '',
        'html': ''
      },
      'termsUrl': '',
      'dataUsePurpose': '',
      'supportContact': '',
      'rating': {
        'score': 'AA*A',
        'points': 15
      },
      'dataPreview': [],
      'graphics': {
        'banner': {
          'normal': ''
        },
        'logo': {
          'normal': ''
        },
        'screenshots': [
          {
            'normal': ''
          },
          {
            'normal': ''
          },
          {
            'normal': ''
          },
          {
            'normal': ''
          }
        ]
      }
    },
    'developer': {
      'id': 'parent-app',
      'name': 'Parent app',
      'url': '',
      'country': 'United Kingdom'
    },
    'permissions': {
      'rolesGranted': [
        {
          'role': 'datadebit',
          'detail': 'parent-app'
        },
        {
          'role': 'namespacewrite',
          'detail': 'parent-app'
        },
        {
          'role': 'namespaceread',
          'detail': 'parent-app'
        }
      ],
      'dataRetrieved': {
        'name': 'parent-app',
        'bundle': {
          'facebook_profile': {
            'endpoints': [
              {
                'endpoint': 'facebook/profile',
                'mapping': {
                  'gender': 'gender',
                  'updated_time': 'hat_updated_time'
                }
              }
            ],
            'orderBy': 'hat_updated_time',
            'ordering': 'descending',
            'limit': 1
          },
          'facebook_messages': {
            'endpoints': [
              {
                'endpoint': 'facebook/feed',
                'mapping': {
                  'id': 'id',
                  'message': 'message',
                  'created_time': 'created_time'
                }
              }
            ],
            'orderBy': 'updated_time',
            'ordering': 'descending',
            'limit': 300
          }
        }
      },
      'dataRequired': {
        'bundle': {
          'name': 'parent-app',
          'bundle': {
            'facebook_profile': {
              'endpoints': [
                {
                  'endpoint': 'facebook/profile',
                  'mapping': {
                    'gender': 'gender',
                    'updated_time': 'hat_updated_time'
                  }
                }
              ],
              'orderBy': 'hat_updated_time',
              'ordering': 'descending',
              'limit': 1
            },
            'facebook_messages': {
              'endpoints': [
                {
                  'endpoint': 'facebook/feed',
                  'mapping': {
                    'id': 'id',
                    'message': 'message',
                    'created_time': 'created_time'
                  }
                }
              ],
              'orderBy': 'updated_time',
              'ordering': 'descending',
              'limit': 300
            }
          }
        },
        'startDate': '2019-03-13T12:18:04+0000',
        'endDate': '2019-03-20T12:18:04+0000',
        'rolling': true
      }
    },
    'setup': {
      'iosUrl': '',
      'onboarding': [
        {
          'title': 'All your words in one place',
          'illustration': {
            'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
              'notablesapp/0x0ss.jpg'
          },
          'description': 'Save them for yourself or share them on social media - you are in control'
        }
      ],
      'dependencies': [
        'facebook',
        'twitter',
        'instagram'
      ],
      'kind': 'External'
    },
    'status': {
      'compatibility': '0.0.1',
      'versionReleaseDate': '2019-02-22T12:00:00.000Z',
      'kind': 'Internal',
      'expectedStatus': 200,
      'statusUrl': '',
      'dataPreviewEndpoint': '',
      'recentDataCheckEndpoint': ''
    }
  },
  'setup': true,
  'enabled': true,
  'active': true,
  'needsUpdating': false
};

describe('HmiDaasContentComponent', () => {
  let component: HmiDaasContentComponent;
  let fixture: ComponentFixture<HmiDaasContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, NoopAnimationsModule ],
      declarations: [ HmiDaasContentComponent, HmiDataPlugComponent, HmiDataDebitComponent, HmiPermissionsDialogComponent,
        HmiPermissionsListComponent, HmiRatingComponent, UnbundlePipe, SafeHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiDaasContentComponent);
    component = fixture.componentInstance;
    component.app = APP_DATA_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
