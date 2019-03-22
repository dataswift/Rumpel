/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 4, 2017
 */

import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { HatSetupLoginComponent } from './hat-setup-login.component';
import { CustomAngularMaterialModule } from '../../core/custom-angular-material.module';
import { APP_CONFIG } from '../../app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UnbundlePipe } from '../../shared/pipes/unbundle.pipe';
// tslint:disable-next-line:max-line-length
import { HatApplicationPermissionsComponent } from '../../shared/components/hat-application-permissions/hat-application-permissions.component';
import { HatAppUpdateNotesComponent } from '../../shared/components/hat-app-update-notes/hat-app-update-notes.component';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { HatApiService } from '../../core/services/hat-api.service';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { HatApplication } from '../../explore/hat-application.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { WINDOW } from '../../core/services/global.service';
import { HatAppHmiContentComponent } from '../../shared/components/hat-app-hmi-content/hat-app-hmi-content.component';
import { SafeHtmlPipe } from '../../shared/pipes';

const PARENT_APPLICATION_MOCK: HatApplication = {
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
        'score': 'AA*A'
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
const DEPENDENCY_APPLICATIONS_MOCK: HatApplication[] = [{'application': {
  'id': 'facebook',
    'kind': {
    'url': '',
      'kind': 'App',
      'iosUrl': ''
  },
  'info': {
    'version': '0.0.1',
      'published': false,
      'name': 'Facebook App',
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
      'score': 'AA*A'
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
    'id': 'facebook',
      'name': 'Facebook app',
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
      'name': 'facebook',
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
        'name': 'facebook',
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
}, {'application': {
  'id': 'twitter',
    'kind': {
    'url': '',
      'kind': 'App',
      'iosUrl': ''
  },
  'info': {
    'version': '0.0.1',
      'published': false,
      'name': 'Twitter',
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
      'score': 'AA*A'
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
}];


describe('HatSetupLoginComponent', () => {
  let component: HatSetupLoginComponent;
  let fixture: ComponentFixture<HatSetupLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule, BrowserAnimationsModule ],
      declarations: [
        HatSetupLoginComponent, HatApplicationPermissionsComponent, HatAppUpdateNotesComponent, UnbundlePipe,
        MarkdownToHtmlPipe, HatAppHmiContentComponent, SafeHtmlPipe ],
      providers: [
        { provide: APP_CONFIG, useValue: {} },
        { provide: WINDOW, useValue: { location: { href: 'http://test.com' }} },
        { provide: ActivatedRoute, useValue: { snapshot: {
          queryParams: {'name': 'parent-app', 'redirect': 'redirectUrl', 'dependencies': 'facebook,twitter'} } } },
        { provide: AuthService, useValue: {
            getApplicationsByIds: () => (of([PARENT_APPLICATION_MOCK, DEPENDENCY_APPLICATIONS_MOCK])),
            appLogin: (applicationId) => of('token')
        }
        },
        { provide: HatApiService, useValue: {} },
        { provide: BrowserStorageService, useValue: {} },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();
  }));

beforeEach(() => {
    fixture = TestBed.createComponent(HatSetupLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.hatApp = PARENT_APPLICATION_MOCK;
    component.dependencyApps = DEPENDENCY_APPLICATIONS_MOCK;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show loading', () => {
    component.hatApp = null;
    component.dependencyApps = null;

    fixture.detectChanges();
    const loading = fixture.debugElement.nativeElement.querySelector('.loading');

    expect(loading).toBeDefined();
  });


  it('should show error', () => {
    component.hatApp = PARENT_APPLICATION_MOCK;
    component.dependencyApps = null;

    fixture.detectChanges();

    expect(component.errorMessage).toEqual(undefined);
  });
});
