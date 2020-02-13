import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileLogoComponent} from './profile-logo.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/User';
import {MatMenuModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../../environments/environment';
import SpyObj = jasmine.SpyObj;

describe('ProfileLogoComponent', () => {
  let component: ProfileLogoComponent;
  let fixture: ComponentFixture<ProfileLogoComponent>;
  let authService: SpyObj<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLogoComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['getUser', 'isLoggedIn', 'logout'])
        },
      ],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatMenuModule
      ]
    })
      .compileComponents();
    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLogoComponent);
    component = fixture.componentInstance;
  });

  const getLoginButton = () => fixture.debugElement.query(By.css('a.login-button'));
  const getRegisterButton = () => fixture.debugElement.query(By.css('a.register-button'));
  const getProfileButton = () => fixture.debugElement.query(By.css('.profile-button'));

  describe('when logged out', () => {
    beforeEach(() => {
      authService.isLoggedIn.and.callFake(() => false);
      fixture.detectChanges();
    });

    it('should not contain profile button', () => {
      expect(getProfileButton()).toBeFalsy();
    });

    it('should contain login button', () => {
      const loginButton = getLoginButton();
      expect(loginButton).toBeTruthy();
      expect(loginButton.nativeElement.textContent).toEqual('Login');
      expect(loginButton.nativeElement.getAttribute('href')).toEqual(environment.authUrl + '/login?returnUnion=mydata');
    });
    it('should contain register button', () => {
      const registerButton = getRegisterButton();
      expect(registerButton).toBeTruthy();
      expect(registerButton.nativeElement.textContent).toEqual('Register');
      expect(registerButton.nativeElement.getAttribute('href')).toEqual(environment.authUrl + '/register?returnUnion=mydata');
    });
  });
  describe('when logged in', () => {
    let button;
    beforeEach(() => {
      authService.isLoggedIn.and.callFake(() => true);
      authService.getUser.and.callFake(() => Promise.resolve<User>({username: 'someName'}));
      fixture.detectChanges();
      button = getProfileButton();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not contain login button', () => {
      expect(getLoginButton()).toBeFalsy();
    });

    it('should show user profile button', () => {
      expect(button).toBeTruthy();
    });

    it('should show first two letters from user name in upper case', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      expect(button.nativeElement.textContent.trim()).toEqual('SO');
    });

    describe('context menu', () => {

      const openMenu = () => {
        button.nativeElement.click();
        fixture.detectChanges();

        return fixture.debugElement.query(By.css('.profile-logo-menu'));
      };

      it('should be opened on click', () => {
        const menu = openMenu();
        expect(menu).toBeTruthy();
      });

      xit('should show username on top of menu', () => {
        const username = openMenu().query(By.css('.mat-menu-item:first-child'));
        expect(username.nativeElement.textContent).toEqual('someName');
      });

      describe('logout button', () => {

        const getLogoutButton = () => {
          return openMenu().query(By.css('.mat-menu-item:nth-child(2)'));
        };

        it('should exist', () => {
          const logoutButton = getLogoutButton();
          expect(logoutButton).toBeTruthy();
          expect(logoutButton.nativeElement.textContent).toEqual('Logout');
        });

        it('should call auth service when clicked', () => {
          getLogoutButton().nativeElement.click();
          fixture.detectChanges();
          expect(authService.logout).toHaveBeenCalled();
        });
      });
    });
  });

});
