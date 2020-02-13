import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';
import {User} from '../_models/User';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getUser(): Promise<User> {
    return this.http.post(environment.authUrl + '/rest/checkToken', this.tokenService.getToken()).toPromise();
  }

  isLoggedIn(): boolean {
    return this.tokenService.tokenExists();
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
