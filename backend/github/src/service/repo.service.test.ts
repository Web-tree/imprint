import {RepoDatasource} from '../datasource/repo.datasource';
import {RepoService} from './repo.service';
import {OrgRepositories, OrgRepositories_organization_repositories_nodes} from '../apollo/github-generated-model';
import {Week} from '../model/v3/week';
import {ContributionStatistics} from '../model/contribution-statistics';
import {User} from '../model/response/user';

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

    it('should call real api successfully', (done) => {
        repoService.getOrgStatContribution('web-tree').then(value => {
            expect(value).toBeDefined();
            done();
        });
    });

    describe('imprint calculation', () => {
        describe('for single user', () => {
            const possibleCombinations: { weeks: Week[], expectedImprint: number }[] = [
                {weeks: [{a: 0, c: 0, w: 1, d: 0}], expectedImprint: 0},
                {weeks: [{a: 1, c: 0, w: 1, d: 0}], expectedImprint: 2},
                {weeks: [{a: 0, c: 1, w: 1, d: 0}], expectedImprint: 5},
                {weeks: [{a: 10, c: 10, w: 1, d: 10}], expectedImprint: 20 + 50 + 5},
                {
                    weeks: [
                        {a: 10, c: 0, w: 1, d: 0},
                        {a: 0, c: 0, w: 2, d: 5}
                    ], expectedImprint: 10 * 2 + Math.round(5 * 0.5)
                },
            ];
            possibleCombinations.forEach((value, key) => {
                it(`should have imprint ${value.expectedImprint} with weeks number: ${key}`, (done) => {
                    repoDatasource.getOrgRepositories = genMockRepos('aRepo');
                    repoDatasource.getContributionStatistics = genMockStats([{weeks: value.weeks, author: {login: 'aLogin', id: 123}, total: 0}]);

                    repoService.getOrgStatContribution(organisationName).then(users => {
                        expect(users[0].imprint.value).toEqual(value.expectedImprint);
                        done();
                    })
                });
            })
        });

        describe('for multiple users', () => {
            it('should calculate imprint for same week', (done) => {
                repoDatasource.getOrgRepositories = genMockRepos('aRepo');

                repoDatasource.getContributionStatistics = genMockStats([
                    {weeks: [{a: 1, c: 0, w: 1, d: 0}], author: {login: 'firstLogin', id: 123}, total: 0},
                    {weeks: [{a: 2, c: 0, w: 1, d: 0}], author: {login: 'secondLogin', id: 321}, total: 0},
                ]);

                repoService.getOrgStatContribution(organisationName).then((users: User[]) => {
                    expect(users).toContainEqual({imprint: {value: 1}, name: 'firstLogin'});
                    expect(users).toContainEqual({imprint: {value: 3}, name: 'secondLogin'});
                    done()
                });
            });
        });
    });

    function genMockStats(statistics: ContributionStatistics[]): () => Promise<ContributionStatistics[]> {
        return jest.fn(() => Promise.resolve(statistics));
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
                            nameWithOwner: value,
                            forkCount: 1,
                            watchers: {totalCount: 0},
                            stargazers: {totalCount: 0},
                        } as OrgRepositories_organization_repositories_nodes
                    })
                }
            }
        }));
    }
});
