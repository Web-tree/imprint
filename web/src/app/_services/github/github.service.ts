import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {GithubOrganisationStats} from '../../_models/github-organisation-stats';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) { }

  fetchOrganisationStats(orgName: string): Promise<GithubOrganisationStats[]> {
    return this.httpClient.get<GithubOrganisationStats[]>(`${environment.githubBackUrl}/org/${orgName}/stats`).toPromise();
  }
}
