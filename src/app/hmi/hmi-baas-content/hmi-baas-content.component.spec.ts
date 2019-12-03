import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmiBaasContentComponent } from './hmi-baas-content.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { HmiDataDebitComponent } from '../hmi-shared-components/hmi-data-debit/hmi-data-debit.component';
import { HmiRatingComponent } from '../hmi-shared-components/hmi-rating/hmi-rating.component';
import { HatApplicationContent } from '../../explore/hat-application.interface';
import { UnbundlePipe } from '../../shared/pipes/unbundle.pipe';
import { HmiPermissionsListComponent } from '../hmi-permissions-list/hmi-permissions-list.component';
import { HmiPermissionsDialogComponent } from '../hmi-permissions-dialog/hmi-permissions-dialog.component';
import { SafeHtmlPipe } from '../../shared/pipes';

const APP_DATA_MOCK: HatApplicationContent = {
  'id': 'notables',
  'kind': {
    'url': 'https://itunes.apple.com/gb/app/notables/id1338778866?mt=8',
    'iosUrl': 'https://itunes.apple.com/gb/app/notables/id1338778866?mt=8',
    'kind': 'App'
  },
  'info': {
    'version': '1.0.3',
    'published': true,
    'name': 'Notables',
    'headline': 'All your words',
    'description': {
      'text': '\n Anything you write online is your data – searches, social media posts, comments and notes.\n\n',
      'markdown': '\n Anything you write online is your data – searches, social media posts, comments and notes.\n\n',
      'html': `\n <p>Anything you write online is your data – searches, social media posts, comments and notes.</p>\n\n`
    },
    'termsUrl': 'https://dataswift.io/website-terms-service',
    'supportContact': 'contact@dataswift.io',
    'rating': {
      'score': 'A',
      'points': 11

    },
    'dataUsePurpose': 'Purpose of data use...',
    'dataPreview': [],
    'graphics': {
      'banner': {
        'normal': ''
      },
      'logo': {
        'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
        'notablesapp/0x0ss.png'
      },
      'screenshots': [
        {
          'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
          'notablesapp/0x0ss.jpg',
          'large': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
          'notablesapp/0x0ss-5.jpg'
        },
        {
          'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
          'notablesapp/0x0ss-2.jpg',
          'large': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
          'notablesapp/0x0ss-6.jpg'
        },
        {
          'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
          'notablesapp/0x0ss-3.jpg',
          'large': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-kex8hb7fsdge/' +
          'notablesapp/0x0ss-7.jpg'
        }
      ]
    }
  },
  'permissions': {
    'rolesGranted': [
      {
        'role': 'namespacewrite',
        'detail': 'rumpel'
      },
      {
        'role': 'namespaceread',
        'detail': 'rumpel'
      },
      {
        'role': 'datadebit',
        'detail': 'app-notables'
      }
    ],
    'dataRetrieved': {
      'name': 'app-notables-v103',
      'bundle': {
        'profile': {
          'endpoints': [
            {
              'endpoint': 'rumpel/profile',
              'mapping': {
                'name': 'personal.preferredName',
                'nick': 'personal.nickName',
                'photo_url': 'photo.avatar'
              },
              'filters': [
                {
                  'field': 'shared',
                  'operator': {
                    'value': true,
                    'operator': 'contains'
                  }
                }
              ]
            }
          ],
          'orderBy': 'dateCreated',
          'ordering': 'descending',
          'limit': 1
        },
        'notables': {
          'endpoints': [
            {
              'endpoint': 'rumpel/notablesv1',
              'mapping': {
                'kind': 'kind',
                'shared': 'shared',
                'message': 'message',
                'author': 'authorv1',
                'location': 'locationv1',
                'shared_on': 'shared_on',
                'created_time': 'created_time',
                'public_until': 'public_until',
                'updated_time': 'updated_time'
              },
              'filters': [
                {
                  'field': 'shared',
                  'operator': {
                    'value': true,
                    'operator': 'contains'
                  }
                }
              ]
            }
          ],
          'orderBy': 'updated_time',
          'ordering': 'descending',
          'limit': 1
        }
      }
    },
    'dataRequired': {
      'bundle': {
        'name': 'app-notables-v103',
        'bundle': {
          'profile': {
            'endpoints': [
              {
                'endpoint': 'rumpel/profile',
                'mapping': {
                  'name': 'personal.preferredName',
                  'nick': 'personal.nickName',
                  'photo_url': 'photo.avatar'
                },
                'filters': [
                  {
                    'field': 'shared',
                    'operator': {
                      'value': true,
                      'operator': 'contains'
                    }
                  }
                ]
              }
            ],
            'orderBy': 'dateCreated',
            'ordering': 'descending',
            'limit': 1
          },
          'notables': {
            'endpoints': [
              {
                'endpoint': 'rumpel/notablesv1',
                'mapping': {
                  'kind': 'kind',
                  'shared': 'shared',
                  'message': 'message',
                  'author': 'authorv1',
                  'location': 'locationv1',
                  'shared_on': 'shared_on',
                  'created_time': 'created_time',
                  'public_until': 'public_until',
                  'updated_time': 'updated_time'
                },
                'filters': [
                  {
                    'field': 'shared',
                    'operator': {
                      'value': true,
                      'operator': 'contains'
                    }
                  }
                ]
              }
            ],
            'orderBy': 'updated_time',
            'ordering': 'descending',
            'limit': 1
          }
        }
      },
      'startDate': '2018-05-03T09:33:39+0000',
      'endDate': '2019-05-03T09:33:39+0000',
      'rolling': true
    }
  },
  'developer': {
    'id': 'dataswift',
    'name': 'DataSwift Ltd',
    'url': 'https://dataswift.io',
    'country': 'United Kingdom'
  },
  'setup': {
    'iosUrl': 'notables://notablesapphost',
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
    'kind': 'External'
  },
  'status': {
    'compatibility': '1.0.3',
    'statusUrl': 'https://notables.hubofallthings.com/api/bulletin/status',
    'expectedStatus': 200,
    'dataPreviewEndpoint': 'she/feed/notables',
    'recentDataCheckEndpoint': 'rumpel/notablesv1',
    'versionReleaseDate': '2018-07-23T12:00:00.000Z',
    'kind': 'External'
  }
};

describe('HmiBaasContentComponent', () => {
  let component: HmiBaasContentComponent;
  let fixture: ComponentFixture<HmiBaasContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, NoopAnimationsModule ],
      declarations: [ HmiBaasContentComponent, HmiDataDebitComponent, HmiRatingComponent,
        HmiPermissionsListComponent, HmiPermissionsDialogComponent, UnbundlePipe, SafeHtmlPipe, UnbundlePipe,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmiBaasContentComponent);
    component = fixture.componentInstance;
    component.app = APP_DATA_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
