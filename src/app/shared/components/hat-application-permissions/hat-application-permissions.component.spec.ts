import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatApplicationPermissionsComponent } from './hat-application-permissions.component';
import { CustomAngularMaterialModule } from '../../../core/custom-angular-material.module';
import { UnbundlePipe } from '../../pipes/unbundle.pipe';
import { HatApplicationContent } from '../../../explore/hat-application.interface';

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
      'text': '\n Anything you write online is your data – searches, social media posts, comments and notes.',
      'markdown': '\n Anything you write online is your data – searches, social media posts, comments and notes.',
      'html': `\n <p>Anything you write online is your data – searches, social media posts, comments and notes.</p>`
    },
    'termsUrl': 'https://hatdex.org/website-terms-service',
    'dataUsePurpose': 'Purpose of data use...',
    'dataPreview': [
      {
        'source': 'notables',
        'date': {
          'iso': '2018-05-03T09:33:38.184Z',
          'unix': 1525340018
        },
        'types': [
          'note'
        ],
        'title': {
          'text': 'leila.hubat.net',
          'action': 'private'
        },
        'content': {
          'text': 'Notes are live!'
        }
      },
      {
        'source': 'notables',
        'date': {
          'iso': '2018-05-03T09:33:38.322Z',
          'unix': 1525340018
        },
        'types': [
          'note'
        ],
        'title': {
          'text': 'leila.hubat.net',
          'action': 'private'
        },
        'content': {
          'text': `And I love 'em!'`
        }
      }
    ],
    'graphics': {
      'banner': {
        'normal': ''
      },
      'logo': {
        'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
        'kex8hb7fsdge/notablesapp/0x0ss.png'
      },
      'screenshots': [
        {
          'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
          'kex8hb7fsdge/notablesapp/0x0ss.jpg',
          'large': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
          'kex8hb7fsdge/notablesapp/0x0ss-5.jpg'
        },
        {
          'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
          'kex8hb7fsdge/notablesapp/0x0ss-2.jpg',
          'large': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
          'kex8hb7fsdge/notablesapp/0x0ss-6.jpg'
        },
        {
          'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
          'kex8hb7fsdge/notablesapp/0x0ss-3.jpg',
          'large': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
          'kex8hb7fsdge/notablesapp/0x0ss-7.jpg'
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
      },
      {
        'role': 'applicationlist'
      },
      {
        'role': 'applicationmanage',
        'detail': 'facebook'
      },
      {
        'role': 'applicationmanage',
        'detail': 'twitter'
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
  'setup': {
    'iosUrl': 'notables://notablesapphost',
    'onboarding': [
      {
        'title': 'All your words in one place',
        'illustration': {
          'normal': 'https://s3-eu-west-1.amazonaws.com/hubofallthings-com-dexservi-dexpublicassetsbucket-' +
          'kex8hb7fsdge/notablesapp/0x0ss.jpg'
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
    'kind': 'External'
  }
};

describe('HatApplicationPermissionsComponent', () => {
  let component: HatApplicationPermissionsComponent;
  let fixture: ComponentFixture<HatApplicationPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ HatApplicationPermissionsComponent, UnbundlePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatApplicationPermissionsComponent);
    component = fixture.componentInstance;
    component.app = APP_DATA_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
