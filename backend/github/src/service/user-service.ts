import {UserDatasource} from '../repo/user-repository';
import {ImprintResponse} from '../model/response/imprint';

export class UserService {

    constructor(
        private userRepository: UserDatasource
    ) {

    }

    getImprint(login: string): Promise<ImprintResponse> {
        return this.userRepository.getUserRepositories(login).then(value => {
            let imprint = 0;
            for (let repo of value.data.user.repositoriesContributedTo.nodes.values()) {
                imprint += repo.forkCount + repo.stargazers.totalCount + repo.watchers.totalCount;
            }
            return <ImprintResponse>{
                imprint: imprint,
                calculatedPercent: 100,
                algorithmVersion: "alfa"
            };
        });
    }
}
