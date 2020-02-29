import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RootTeamPageComponent} from './root-team-page.component';
import {UserListComponent} from '../../user/user-list/user-list.component';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {HttpClientModule} from '@angular/common/http';

describe('RootTeamPageComponent', () => {
  let component: RootTeamPageComponent;
  let fixture: ComponentFixture<RootTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatBadgeModule,
        HttpClientModule
      ],
      declarations: [
        RootTeamPageComponent,
        UserListComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
