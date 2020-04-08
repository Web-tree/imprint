import {TestBed} from '@angular/core/testing';

import {GithubService} from './github.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {GithubOrganisationStats} from '../../_models/github-organisation-stats';

describe('GithubService', () => {
  let httpMock: HttpTestingController;
  let service: GithubService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(GithubService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Organisation', () => {
    const orgName = 'web-tree';

    it('should call imprint backend', () => {
      // when
      service.fetchOrganisationStats(orgName);

      // then
      httpMock.expectOne(`${environment.githubBackUrl}/org/${orgName}/stats`);
    });

    it('should return organisation\'s stats', async () => {
      // given
      const orgStats = new GithubOrganisationStats();

      // when
      const statsPromise: Promise<GithubOrganisationStats[]> = service.fetchOrganisationStats(orgName);
      httpMock.expectOne(`${environment.githubBackUrl}/org/${orgName}/stats`).flush([orgStats]);

      // then
      const stats: GithubOrganisationStats[] = await statsPromise;
      expect(stats).toBeTruthy();
      expect(stats.length).toEqual(1);
      expect(stats[0]).toEqual(orgStats);
    });
  });

});
