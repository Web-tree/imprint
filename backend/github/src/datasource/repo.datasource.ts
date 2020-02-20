import {ContributionStatistics} from '../model/contribution-statistics';
import * as request from 'request-promise-native';


export class RepoDatasource {

    constructor() {
    }

    getContributionStatistics(nameWithOwner: string): Promise<ContributionStatistics[]> {
        return request.get({
            uri: `https://api.github.com/repos/${nameWithOwner}/stats/contributors`,
            headers: {
                'User-Agent': 'Webtree-Imprint'
            },
            json: true
        });
    }
}
