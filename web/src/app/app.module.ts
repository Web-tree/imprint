import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RootTeamPageComponent} from './static-pages/root-team-page/root-team-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {ProfileLogoComponent} from './profile-logo/profile-logo.component';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from './_services/token.service';
import {AuthService} from './_services/auth.service';
import {AlertService} from './_services/alert.service';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ProfileLogoComponent,
    RootTeamPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    TokenService,
    AuthService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
