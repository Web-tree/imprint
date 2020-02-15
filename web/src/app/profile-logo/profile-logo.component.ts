import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/User';
import {environment} from '../../environments/environment';

@Component({
  selector: 'imprint-profile-logo',
  templateUrl: './profile-logo.component.html',
  styleUrls: ['./profile-logo.component.scss']
})
export class ProfileLogoComponent implements OnInit {

  user: User = {};
  private username: string;

  constructor(
    public authService: AuthService
  ) {
  }
  shortName: string;
  loginUrl: string = environment.authUrl + '/login?returnUnion=imprint';
  registerUrl: string = environment.authUrl + '/register?returnUnion=imprint';

  static generateShortName(user: User): string {
    return user.username.slice(0, 2).toUpperCase();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.getUser().then(user => {
        this.user = user;
        this.username = user.username;
        this.shortName = ProfileLogoComponent.generateShortName(user);
      });
    }
  }

}
