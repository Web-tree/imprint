import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {ProfileLogoComponent} from './profile-logo/profile-logo.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TokenService} from './_services/token.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatMenuModule,
        MatBadgeModule,
        MatListModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        ProfileLogoComponent,
        UserListComponent,
      ],
      providers: [
        TokenService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'imprint-web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('imprint-web');
  });
});
