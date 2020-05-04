import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootTeamPageComponent} from './static-pages/root-team-page/root-team-page.component';
import {GithubOrganisationStats} from './_models/github-organisation-stats';
import {GithubOrganisationPageComponent} from './github/github-organisation-page/github-organisation-page.component';
import {ApplyTokenComponent} from './apply-token/apply-token.component';


const routes: Routes = [
  {path: 'applyToken', component: ApplyTokenComponent},
  {path: '', redirectTo: '/union/github.com/org/web-tree', pathMatch: 'full'},
  {path: 'root-team', component: RootTeamPageComponent},
  {path: 'union/github.com/org/:organisation', component: GithubOrganisationPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
