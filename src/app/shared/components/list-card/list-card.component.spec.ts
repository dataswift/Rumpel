import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardComponent } from './list-card.component';
import { ReplaceCharsPipe } from '../../pipes/replace-chars.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { CustomAngularMaterialModule } from '../../../core/custom-angular-material.module';

describe('ListCardComponent', () => {
  let component: ListCardComponent;
  let fixture: ComponentFixture<ListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CustomAngularMaterialModule ],
      declarations: [ ListCardComponent, ReplaceCharsPipe, SafeHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
