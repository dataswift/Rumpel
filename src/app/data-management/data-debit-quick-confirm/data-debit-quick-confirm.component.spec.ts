import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDebitQuickConfirmComponent } from './data-debit-quick-confirm.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HatApiService } from '../../core/services/hat-api.service';
import { DialogService } from '../../core/dialog.service';
import { DatetimePipe } from '../../shared/pipes/datetime.pipe';
import { UnbundlePipe } from '../../shared/pipes/unbundle.pipe';
import { of } from 'rxjs';
import { DataDebit } from '../data-debit.interface';

const TEST_DATA_DEBIT: DataDebit = {
  'dataDebitKey': 'app-cade-demo',
  'dateCreated': '2018-06-14T09:38:46+0000',
  'permissions': [
    {
      'dateCreated': '2018-06-14T09:38:46+0000',
      'purpose': 'Purpose of data use...',
      'start': '2018-06-14T09:38:46.604Z',
      'period': 2592000000,
      'cancelAtPeriodEnd': false,
      'termsUrl': 'https://dataswift.io/website-terms-service',
      'bundle': {
        'name': 'app-cade-demo-v001',
        'bundle': {
          'photo': {
            'endpoints': [
              {
                'endpoint': 'rumpel/profile',
                'mapping': {
                  'photo_url': 'photo.avatar'
                }
              },
              {
                'endpoint': 'facebook/profile',
                'mapping': {
                  'photo_url': 'url'
                }
              }
            ]
          },
          'profile': {
            'endpoints': [
              {
                'endpoint': 'rumpel/profile',
                'mapping': {
                  'name': 'personal.firstName',
                  'email': 'contact.primaryEmail',
                  'lastUpdated': 'dateCreatedLocal'
                }
              },
              {
                'endpoint': 'facebook/profile',
                'mapping': {
                  'name': 'name',
                  'email': 'email'
                }
              }
            ],
            'orderBy': 'lastUpdated',
            'ordering': 'descending'
          },
          'messages': {
            'endpoints': [
              {
                'endpoint': 'rumpel/notablesv1',
                'mapping': {
                  'message': 'message'
                }
              },
              {
                'endpoint': 'facebook/feed',
                'mapping': {
                  'message': 'message'
                }
              },
              {
                'endpoint': 'twitter/tweets',
                'mapping': {
                  'message': 'text'
                }
              }
            ],
            'orderBy': 'lastUpdated',
            'ordering': 'descending'
          }
        }
      },
      'accepted': true,
      'active': true,
      'end': null
    }
  ],
  'requestClientName': 'CADE demo',
  'requestClientUrl': 'https://hub-of-all-things.github.io/demo-cade/',
  'requestClientLogoUrl': 'https://developers.hubofallthings.com/images/header-access-api.00ce.svg',
  'requestApplicationId': 'cade-demo',
  'requestDescription': '\n Anything you write online is your data – get experiences personalised to your words\n        ',
  'active': true,
  'accepted': true,
  'start': '2018-06-14T09:38:46.604Z',
  'end': null,
  'permissionsActive': {
    'dateCreated': '2018-06-14T09:38:46+0000',
    'purpose': 'Purpose of data use...',
    'start': '2018-06-14T09:38:46.604Z',
    'period': 2592000000,
    'cancelAtPeriodEnd': false,
    'termsUrl': 'https://dataswift.io/website-terms-service',
    'bundle': {
      'name': 'app-cade-demo-v001',
      'bundle': {
        'photo': {
          'endpoints': [
            {
              'endpoint': 'rumpel/profile',
              'mapping': {
                'photo_url': 'photo.avatar'
              }
            },
            {
              'endpoint': 'facebook/profile',
              'mapping': {
                'photo_url': 'url'
              }
            }
          ]
        },
        'profile': {
          'endpoints': [
            {
              'endpoint': 'rumpel/profile',
              'mapping': {
                'name': 'personal.firstName',
                'email': 'contact.primaryEmail',
                'lastUpdated': 'dateCreatedLocal'
              }
            },
            {
              'endpoint': 'facebook/profile',
              'mapping': {
                'name': 'name',
                'email': 'email'
              }
            }
          ],
          'orderBy': 'lastUpdated',
          'ordering': 'descending'
        },
        'messages': {
          'endpoints': [
            {
              'endpoint': 'rumpel/notablesv1',
              'mapping': {
                'message': 'message'
              }
            },
            {
              'endpoint': 'facebook/feed',
              'mapping': {
                'message': 'message'
              }
            },
            {
              'endpoint': 'twitter/tweets',
              'mapping': {
                'message': 'text'
              }
            }
          ],
          'orderBy': 'lastUpdated',
          'ordering': 'descending'
        }
      }
    },
    'accepted': true,
    'active': true,
    'end': null
  },
  'permissionsLatest': {
    'dateCreated': '2018-06-14T09:38:46+0000',
    'purpose': 'Purpose of data use...',
    'start': '2018-06-14T09:38:46.604Z',
    'period': 2592000000,
    'cancelAtPeriodEnd': false,
    'termsUrl': 'https://dataswift.io/website-terms-service',
    'bundle': {
      'name': 'app-cade-demo-v001',
      'bundle': {
        'photo': {
          'endpoints': [
            {
              'endpoint': 'rumpel/profile',
              'mapping': {
                'photo_url': 'photo.avatar'
              }
            },
            {
              'endpoint': 'facebook/profile',
              'mapping': {
                'photo_url': 'url'
              }
            }
          ]
        },
        'profile': {
          'endpoints': [
            {
              'endpoint': 'rumpel/profile',
              'mapping': {
                'name': 'personal.firstName',
                'email': 'contact.primaryEmail',
                'lastUpdated': 'dateCreatedLocal'
              }
            },
            {
              'endpoint': 'facebook/profile',
              'mapping': {
                'name': 'name',
                'email': 'email'
              }
            }
          ],
          'orderBy': 'lastUpdated',
          'ordering': 'descending'
        },
        'messages': {
          'endpoints': [
            {
              'endpoint': 'rumpel/notablesv1',
              'mapping': {
                'message': 'message'
              }
            },
            {
              'endpoint': 'facebook/feed',
              'mapping': {
                'message': 'message'
              }
            },
            {
              'endpoint': 'twitter/tweets',
              'mapping': {
                'message': 'text'
              }
            }
          ],
          'orderBy': 'lastUpdated',
          'ordering': 'descending'
        }
      }
    },
    'accepted': true,
    'active': true,
    'end': null
  }
};

describe('DataDebitQuickConfirmComponent', () => {
  let component: DataDebitQuickConfirmComponent;
  let fixture: ComponentFixture<DataDebitQuickConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, RouterTestingModule ],
      declarations: [ DataDebitQuickConfirmComponent, DatetimePipe, UnbundlePipe ],
      providers: [
        { provide: HatApiService, useValue: {
          getDataDebit: () => of(TEST_DATA_DEBIT),
          enableDataDebit: () => of({})
        } },
        { provide: DialogService, useValue: { createDialog: () => null } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDebitQuickConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
