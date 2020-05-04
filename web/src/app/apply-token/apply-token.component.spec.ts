import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplyTokenComponent} from './apply-token.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../_services/token.service';

describe('ApplyTokenComponent', () => {
  let component: ApplyTokenComponent;
  let fixture: ComponentFixture<ApplyTokenComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {
    activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['']);
    router = jasmine.createSpyObj('Router', ['']);
    activatedRoute.fragment = jasmine.createSpyObj('Subscribe', ['subscribe']);
    TestBed.configureTestingModule({
      declarations: [ApplyTokenComponent],
      providers: [
        TokenService,
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useValue: router},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
