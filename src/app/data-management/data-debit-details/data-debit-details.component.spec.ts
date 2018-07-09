import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDebitDetailsComponent } from './data-debit-details.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HatApiService } from '../../core/services/hat-api.service';
import { UnbundlePipe } from '../../shared/pipes/unbundle.pipe';
import { DataDebit } from '../data-debit.interface';

const TEST_DATA_DEBIT: DataDebit = {
    'dataDebitKey': 'app-notables',
    'dateCreated': '2018-03-02T08:06:42+0000',
    'permissions': [
      {
        'dateCreated': '2018-03-23T09:23:33+0000',
        'purpose': '',
        'start': '2018-03-23T09:23:33.787Z',
        'period': 31472886000,
        'cancelAtPeriodEnd': false,
        'termsUrl': '',
        'bundle': {
          'name': 'app-notables-v101',
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
                    'author': 'authorv1',
                    'shared': 'shared',
                    'message': 'message',
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
        'accepted': true,
        'active': true,
        'end': null
      },
      {
        'dateCreated': '2018-03-02T08:06:42+0000',
        'purpose': '',
        'start': '2018-03-02T08:01:14.000Z',
        'period': 31536000000,
        'cancelAtPeriodEnd': false,
        'termsUrl': '',
        'bundle': {
          'name': 'app-notables-v100',
          'bundle': {
            'profile': {
              'endpoints': [
                {
                  'endpoint': 'rumpel/profile',
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
              'orderBy': 'updated_time',
              'ordering': 'descending',
              'limit': 1
            }
          }
        },
        'accepted': false,
        'active': false,
        'end': null
      }
    ],
    'requestClientName': '',
    'requestClientUrl': '',
    'requestClientLogoUrl': '',
    'active': true,
    'start': '2018-03-23T09:23:33.787Z',
    'end': null,
    'permissionsActive': {
      'dateCreated': '2018-03-23T09:23:33+0000',
      'purpose': '',
      'start': '2018-03-23T09:23:33.787Z',
      'period': 31472886000,
      'cancelAtPeriodEnd': false,
      'termsUrl': '',
      'bundle': {
        'name': 'app-notables-v101',
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
                  'author': 'authorv1',
                  'shared': 'shared',
                  'message': 'message',
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
      'accepted': true,
      'active': true,
      'end': null
    },
    'permissionsLatest': {
      'dateCreated': '2018-03-23T09:23:33+0000',
      'purpose': '',
      'start': '2018-03-23T09:23:33.787Z',
      'period': 31472886000,
      'cancelAtPeriodEnd': false,
      'termsUrl': '',
      'bundle': {
        'name': 'app-notables-v101',
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
                  'author': 'authorv1',
                  'shared': 'shared',
                  'message': 'message',
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
      'accepted': true,
      'active': true,
      'end': null
    }
  };

xdescribe('DataDebitDetailsComponent', () => {
  let component: DataDebitDetailsComponent;
  let fixture: ComponentFixture<DataDebitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ DataDebitDetailsComponent, UnbundlePipe ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'test' }) } },
        { provide: HatApiService, useValue: { getDataDebit: (testId: string) => {
          if (testId === 'test') {
            return of(TEST_DATA_DEBIT);
          } else {
            return throwError('Given ID does not exist');
          }
        } } }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDebitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });
});
