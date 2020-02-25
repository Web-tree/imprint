import {RepoDatasource} from '../datasource/repo.datasource';
import {ContributionStatistics} from '../model/contribution-statistics';
import {User} from '../model/response/user';

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
            const repoSizePerRepoPerWeek: Map<string, Map<number, RepoSize>> = new Map();
            const userStatPerRepoPerWeek: Map<string, Map<string, Map<number, User>>> = new Map();
            const repoImprint: Map<string, number> = new Map();
            for (let repositoriesKey in orgs.organization.repositories.nodes) {
                const repo = orgs.organization.repositories.nodes[repositoriesKey];
                let name = repo.nameWithOwner;
                if (!repo.isFork) {
                    statPromises.set(name, this.repoDatasource.getContributionStatistics(name));
                    repoSizePerRepoPerWeek.set(name, new Map());
                    userStatPerRepoPerWeek.set(name, new Map());
                    repoImprint.set(name, repo.forkCount + repo.stargazers.totalCount + repo.watchers.totalCount);
                }
            }

            await this.calcRepoPerWeek(statPromises, repoSizePerRepoPerWeek);

            await this.calcUserStats(statPromises, userStatPerRepoPerWeek, repoSizePerRepoPerWeek, repoImprint);

            const groupedUsers: Map<string, User> = new Map<string, User>();
            userStatPerRepoPerWeek.forEach((usersByWeek) => {
                usersByWeek.forEach((users) => {
                    users.forEach((user) => {
                        if (groupedUsers.has(user.name)) {
                            groupedUsers.get(user.name).imprint.value += user.imprint.value;
                        } else {
                            groupedUsers.set(user.name, user);
                        }
                    });
                });
            });
            console.log(groupedUsers);
            return Array.from(groupedUsers.values());
        });
    }

    private calcUserStats(statPromises: Map<string, Promise<ContributionStatistics[]>>, userStatPerRepoPerWeek: Map<string, Map<string, Map<number, User>>>, repoSizePerRepoPerWeek: Map<string, Map<number, RepoSize>>, repoImprint: Map<string, number>) {
        const statCalcPromises: Promise<null>[] = [];
        statPromises.forEach((contributionStatsPromise, repoName) => {
            contributionStatsPromise.then(contributionStatistics => {
                    if (contributionStatistics) {
                        contributionStatistics.forEach(stat => {
                            stat.weeks.forEach(userWeek => {
                                if (!userStatPerRepoPerWeek.get(repoName).has(stat.author.login)) {
                                    userStatPerRepoPerWeek.get(repoName).set(stat.author.login, new Map());
                                }
                                let userStat = userStatPerRepoPerWeek.get(repoName).get(stat.author.login);

                                if (!userStat.has(userWeek.w)) {
                                    userStat.set(userWeek.w, {imprint: {value: 0}, name: stat.author.login})
                                }
                                let user = userStat.get(userWeek.w);
                                let repoSize = repoSizePerRepoPerWeek.get(repoName).get(userWeek.w);
                                const commitImprint = this.calcWeekPartImprint(userWeek.c, repoSize.commitsAmount, this._commitMultiplier);
                                const addedLinesImprint = this.calcWeekPartImprint(userWeek.a, repoSize.size, this._addedLineMultiplier);
                                const deletedLinesImprint = this.calcWeekPartImprint(userWeek.d, repoSize.size, this._deleteMultiplier);
                                user.imprint.value += commitImprint + addedLinesImprint + deletedLinesImprint;
                                user.imprint.value *= repoImprint.get(repoName);
                                console.log(user.name, user.imprint.value);
                                userStat.set(userWeek.w, user);
                                userStatPerRepoPerWeek.get(repoName).set(stat.author.login, userStat);
                            });
                        });
                    }
                    statCalcPromises.push(Promise.resolve(null));
                }
            );
        });
        return Promise.all(statCalcPromises);
    }

    private calcWeekPartImprint(userValue, repoSumValue, multiplier) {
        const userToRepo = repoSumValue == 0 ? 1 : userValue / repoSumValue;
        return Math.round(userValue * userToRepo * multiplier);
    }

    private calcRepoPerWeek(statPromises: Map<string, Promise<ContributionStatistics[]>>, repoSizePerRepoPerWeek: Map<string, Map<number, RepoSize>>) {
        const statCalcPromises: Promise<void>[] = [];
        statPromises.forEach((contributionStatsPromise, repoName) => {
            let repoSize = 0;
            let commitsSum = 0;
            statCalcPromises.push(contributionStatsPromise.then(contributionStatistics => {
                    if (contributionStatistics) {
                        console.log(contributionStatistics);
                        contributionStatistics.forEach(stat => {
                            stat.weeks.forEach(week => {
                                repoSize += (week.a - week.d);
                                commitsSum += week.c;
                                repoSizePerRepoPerWeek.get(repoName).set(week.w, {commitsAmount: commitsSum, size: repoSize});
                            });
                        });
                    }
                }
            ));
        });

        return Promise.all(statCalcPromises);
    }
}
interface RepoSize {
    size: number
    commitsAmount: number
}
