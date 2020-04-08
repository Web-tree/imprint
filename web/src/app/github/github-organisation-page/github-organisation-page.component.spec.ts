import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubOrganisationPageComponent } from './github-organisation-page.component';
import {GithubService} from '../../_services/github/github.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {ActivatedRoute, convertToParamMap, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';

describe('GithubOrganisationPageComponent', () => {
  let component: GithubOrganisationPageComponent;
  let fixture: ComponentFixture<GithubOrganisationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubOrganisationPageComponent ],
      providers: [
        GithubService,
      ],
      imports: [
        MatBadgeModule,
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubOrganisationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
