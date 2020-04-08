import {Component, Input, OnInit} from '@angular/core';
import {GithubService} from '../../_services/github/github.service';
import {GithubOrganisationStats} from '../../_models/github-organisation-stats';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'imprint-github-organisation-page',
  templateUrl: './github-organisation-page.component.html',
  styleUrls: ['./github-organisation-page.component.scss']
})
export class GithubOrganisationPageComponent implements OnInit {
  orgStats: GithubOrganisationStats[];
  loading = true;

  constructor(
    private githubService: GithubService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    const organisationName = this.router.snapshot.params.organisation;
    this.githubService.fetchOrganisationStats(organisationName).then(orgStats => {
      this.orgStats = orgStats;
      this.loading = false;
    });
  }
}
