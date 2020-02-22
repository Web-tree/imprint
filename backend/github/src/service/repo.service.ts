import {RepoDatasource} from '../datasource/repo.datasource';
import {ContributionStatistics} from '../model/contribution-statistics';
import {User} from '../model/response/user';
import {Week} from '../model/v3/week';

export class RepoService {

    private _commitMultiplier: number = 5;
    private _addedLineMultiplier: number = 2;
    private _deleteMultiplier: number = 0.5;

    constructor(private repoDatasource?: RepoDatasource) {
        this.repoDatasource = repoDatasource ? repoDatasource : new RepoDatasource();
    }

    getOrgStatContribution(organisationName: string): Promise<User[]> {
        return this.repoDatasource.getOrgRepositories(organisationName).then(async orgs => {
            const statPromises: Map<string, Promise<ContributionStatistics[]>> = new Map();
            const repoSizePerRepoPerWeek: Map<string, Map<number, Week>> = new Map();
            const userStatPerRepoPerWeek: Map<string, Map<number, User>> = new Map();
            for (let repositoriesKey in orgs.organization.repositories.nodes) {
                const repo = orgs.organization.repositories.nodes[repositoriesKey];
                let name = repo.nameWithOwner;
                statPromises.set(name, this.repoDatasource.getContributionStatistics(name));
                repoSizePerRepoPerWeek.set(name, new Map());
                userStatPerRepoPerWeek.set(name, new Map());
            }

            await this.calcRepoPerWeek(statPromises, repoSizePerRepoPerWeek);

            await this.calcUserStats(statPromises, userStatPerRepoPerWeek, repoSizePerRepoPerWeek);

            const groupedUsers: Map<string, User> = new Map<string, User>();
            userStatPerRepoPerWeek.forEach((usersByWeek) => {
                usersByWeek.forEach((user) => {
                    if (groupedUsers.has(user.name)) {
                        groupedUsers.get(user.name).imprint.value += user.imprint.value;
                    } else {
                        groupedUsers.set(user.name, user);
                    }
                });
            });
            return Array.from(groupedUsers.values());
        });
    }

    private calcUserStats(statPromises: Map<string, Promise<ContributionStatistics[]>>, userStatPerRepoPerWeek: Map<string, Map<number, User>>, repoSizePerRepoPerWeek: Map<string, Map<number, Week>>) {
        const statCalcPromises: Promise<null>[] = [];
        statPromises.forEach((contributionStatsPromise, repoName) => {
            contributionStatsPromise.then(contributionStatistics => {
                    contributionStatistics.forEach(stat => {
                        stat.weeks.forEach(userWeek => {
                            let userStat = userStatPerRepoPerWeek.get(repoName);
                            if (!userStat.has(userWeek.w)) {
                                userStat.set(userWeek.w, {imprint: {value: 0}, name: stat.author.login})
                            }
                            let user = userStat.get(userWeek.w);
                            let repoWeek = repoSizePerRepoPerWeek.get(repoName).get(userWeek.w);
                            const commitImprint = this.calcWeekPartImprint(userWeek.c, repoWeek.c, this._commitMultiplier);
                            const addedLinesImprint = this.calcWeekPartImprint(userWeek.a, repoWeek.a, this._addedLineMultiplier);
                            const deletedLinesImprint = this.calcWeekPartImprint(userWeek.d, repoWeek.d, this._deleteMultiplier);
                            user.imprint.value = user.imprint.value
                                + commitImprint
                                + addedLinesImprint
                                + deletedLinesImprint;
                            userStat.set(userWeek.w, user);
                            userStatPerRepoPerWeek.set(repoName, userStat);
                        });
                    });
                    statCalcPromises.push(Promise.resolve(null));
                }
            );
        });

        let promise = Promise.all(statCalcPromises);
        return promise;
    }

    private calcWeekPartImprint(userValue, repoSummValue, multiplier) {
        const userToRepo = repoSummValue == 0 ? 1 : userValue / repoSummValue;
        return userValue * userToRepo * multiplier;
    }

    private calcRepoPerWeek(statPromises: Map<string, Promise<ContributionStatistics[]>>, repoSizePerRepoPerWeek: Map<string, Map<number, Week>>) {
        const statCalcPromises: Promise<null>[] = [];
        statPromises.forEach((contributionStatsPromise, repoName) => {
            contributionStatsPromise.then(contributionStatistics => {
                    contributionStatistics.forEach(stat => {
                        stat.weeks.forEach(week => {
                            repoSizePerRepoPerWeek.get(repoName).set(week.w, week);
                        });
                    });
                    statCalcPromises.push(Promise.resolve(null));
                }
            );
        });

        return Promise.all(statCalcPromises);
    }
}
