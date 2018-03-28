import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheFeedItemComponent } from './she-feed-item.component';
import { CustomAngularMaterialModule } from '../../../core/custom-angular-material.module';
import { MomentPipe } from '../../pipes/moment.pipe';

const MOCK_SHE_ITEM = {
  'source': 'google',
  'date': {
    'iso': '2018-06-04T00:00:00.000Z',
    'unix': 1528070400
  },
  'types': [
    'event'
  ],
  'title': {
    'text': 'Cambridge Team Work',
    'action': 'event'
  },
  'content': {
    'text': '04 June'
  }
};

describe('SheFeedItemComponent', () => {
  let component: SheFeedItemComponent;
  let fixture: ComponentFixture<SheFeedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ SheFeedItemComponent, MomentPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheFeedItemComponent);
    component = fixture.componentInstance;
    component.feedItem = MOCK_SHE_ITEM;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
