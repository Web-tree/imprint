import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TokenService
        ],
        imports: [
          HttpClientTestingModule
        ]
      });
      service = TestBed.get(AuthService);
      httpMock = TestBed.get(HttpTestingController);
      tokenService = TestBed.get(TokenService);
    }
  );

  afterEach(() => {
    tokenService.removeToken();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser method', () => {
    it('should call auth url', async () => {
      const token = 'someToken';
      tokenService.saveToken(token);

      service.getUser().then();
      const req = httpMock.expectOne(environment.authUrl + '/rest/checkToken');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(token);
    });

    it('should return user from http request', async () => {
      tokenService.saveToken('token');
      const user = {username: 'name'};

      const promise = service.getUser();
      httpMock.expectOne(environment.authUrl + '/rest/checkToken').flush(user);

      expect(await promise).toEqual(user);
    });
  });

  describe('isLoggedIn method', () => {
    it('should return false if token not exists', () => {
      expect(service.isLoggedIn()).toBeFalsy();
    });

    it('should return true if token exists', () => {
      tokenService.saveToken('token');
      expect(service.isLoggedIn()).toBeTruthy();
    });
  });

  describe('logout method', () => {
    it('should not contain token after logout', () => {
      tokenService.saveToken('token');
      service.logout();
      expect(tokenService.tokenExists()).toBeFalsy();
    });
  });
});
