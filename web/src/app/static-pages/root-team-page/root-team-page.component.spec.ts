import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootTeamPageComponent } from './root-team-page.component';

describe('RootTeamPageComponent', () => {
  let component: RootTeamPageComponent;
  let fixture: ComponentFixture<RootTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootTeamPageComponent ]
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
