import {RepoDatasource} from './repo.datasource';
import {ContributionStatistics} from '../model/contribution-statistics';

describe('Repo Datasource', () => {

    let nameWithOwner = 'web-tree/trust';

    let repoDatasource;
    beforeEach(() => {
        repoDatasource = new RepoDatasource();
    });

    it('should return repo contribution statistics', (done) => {
        const promise: Promise<ContributionStatistics[]> = repoDatasource.getContributionStatistics(nameWithOwner);
        promise.then(stats => {
            expect(stats).toBeDefined();
            expect(stats.length).toBeGreaterThanOrEqual(1);
            expect(stats[0].total).toBeGreaterThanOrEqual(1);
            expect(stats[0].weeks.length).toBeGreaterThanOrEqual(95);
            expect(stats[0].weeks[1].w).toEqual(1525564800);
            expect(stats[0].weeks[1].a).toEqual(129);
            expect(stats[0].weeks[1].d).toEqual(122);
            expect(stats[0].weeks[1].c).toEqual(1);

            expect(stats[0].author).toBeDefined();
            expect(stats[0].author.login).toEqual('UdjinSkobelev');
            expect(stats[0].author.id).toEqual(43615914);
            done();
        });
    });
});
