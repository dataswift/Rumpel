import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardComponent } from './activity-card.component';
import { LocationNotableComponent } from '../../shared/components/location-notable/location-notable.component';
import { LocationFbPostComponent } from '../../social/location-fb-post/location-fb-post.component';
import { FitbitMyDayComponent } from '../../fitbit/fitbit-my-day/fitbit-my-day.component';
import { MonzoMyDayComponent } from '../../monzo/monzo-my-day/monzo-my-day.component';
import { LocationTweetComponent } from '../../social/location-tweet/location-tweet.component';
import { LimitContentPipe } from '../../shared/pipes/limit-content.pipe';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { MarkdownToHtmlPipe } from '../../shared/pipes/markdown-to-html.pipe';
import { RelativeTimePipe } from '../../shared/pipes/relative-time.pipe';
import { RemoveCharsPipe } from '../../shared/pipes/removeChars.pipe';


describe('ActivityCardComponent', () => {
  let component: ActivityCardComponent;
  let fixture: ComponentFixture<ActivityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityCardComponent,
        LocationNotableComponent,
        LocationFbPostComponent,
        FitbitMyDayComponent,
        MonzoMyDayComponent,
        LocationTweetComponent,
        LimitContentPipe,
        MomentPipe,
        SafeHtmlPipe,
        MarkdownToHtmlPipe,
        RelativeTimePipe,
        RemoveCharsPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
