import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootTeamPageComponent} from './static-pages/root-team-page/root-team-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/root-team', pathMatch: 'full'},
  {path: 'root-team', component: RootTeamPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
