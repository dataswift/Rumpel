import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatusTileComponent } from './account-status-tile.component';

describe('AccountStatusTileComponent', () => {
  let component: AccountStatusTileComponent;
  let fixture: ComponentFixture<AccountStatusTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountStatusTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatusTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
