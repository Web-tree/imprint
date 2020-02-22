import {RepoDatasource} from '../datasource/repo.datasource';
import {RepoService} from './repo.service';
import {OrgRepositories, OrgRepositories_organization_repositories_nodes} from '../apollo/github-generated-model';
import {Week} from '../model/v3/week';
import {ContributionStatistics} from '../model/contribution-statistics';
import {User} from '../model/v3/user';

const organisationName = 'SomeOrgName';
describe('Repo Service', () => {
    let repoDatasource: RepoDatasource;
    let repoService: RepoService;
    beforeEach(() => {
        repoDatasource = new RepoDatasource();
        repoService = new RepoService(repoDatasource);
    });

    it('should return empty list when there are no repositories in organisation', (done) => {
        repoDatasource.getOrgRepositories = genMockRepos();
        repoService.getOrgStatContribution(organisationName).then(value => {
            expect(value).toEqual([]);
            done();
        });
    });

    it('should return empty list when stats for all repositories are empty', (done) => {
        repoDatasource.getOrgRepositories = genMockRepos('repo1', 'repo2');
        repoDatasource.getContributionStatistics = jest.fn(() => Promise.resolve([]));

        repoService.getOrgStatContribution(organisationName).then(value => {
            expect(value).toEqual([]);
            done();
        });
    });

    describe('imprint calculation', () => {
        const possibleCombinations: {weeks: Week[], expectedImprint: number}[] = [
            {weeks: [{a: 0, c: 0, w: 1, d: 0}], expectedImprint: 0},
            {weeks: [{a: 1, c: 0, w: 1, d: 0}], expectedImprint: 2},
            {weeks: [{a: 0, c: 1, w: 1, d: 0}], expectedImprint: 5},
            {weeks: [{a: 0, c: 0, w: 1, d: 1}], expectedImprint: 0.5},
            {weeks: [{a: 10, c: 10, w: 1, d: 10}], expectedImprint: 20 + 50 + 5},
            {weeks: [
                {a: 5, c: 5, w: 1, d: 5},
                {a: 5, c: 5, w: 1, d: 5}
            ], expectedImprint: 20 + 50 + 5},
        ];
        possibleCombinations.forEach(value => {
            it(`should have imprint ${value.expectedImprint} with weeks: ${value.weeks}`, (done) => {
                repoDatasource.getOrgRepositories = genMockRepos('aRepo');
                repoDatasource.getContributionStatistics = genMockStats(value.weeks, {login: 'aLogin', id: 123});

                repoService.getOrgStatContribution(organisationName).then(users => {
                    expect(users[0].imprint.value).toEqual(value.expectedImprint);
                    done();
                })
            });
        })
    });

    function genMockStats(weeks: Week[], user: User): () => Promise<ContributionStatistics[]> {
        return jest.fn(() => Promise.resolve([
            {weeks: weeks, author: user, total: 0} as ContributionStatistics
        ]));
    }

    function genMockRepos(...names): () => Promise<OrgRepositories> {
        return jest.fn(() => Promise.resolve({
            organization: {
                id: '',
                __typename: 'Organization',
                repositories: {
                    __typename: 'RepositoryConnection',
                    nodes: names.map(value => {
                        return {
                            __typename: "Repository",
                            nameWithOwner: value
                        } as OrgRepositories_organization_repositories_nodes
                    })
                }
            }
        }));
    }
});
