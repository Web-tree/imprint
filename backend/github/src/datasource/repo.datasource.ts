import {ContributionStatistics} from '../model/contribution-statistics';
import * as request from 'request-promise-native';
import {apolloClient} from '../apollo/client';
import {ApolloClient} from 'apollo-client';
import {NormalizedCacheObject} from 'apollo-boost';
import {GetOrgRepositories} from '../apollo/queries';
import {OrgRepositories} from '../apollo/github-generated-model';


export class RepoDatasource {

    constructor(private graphqlClient?: ApolloClient<NormalizedCacheObject>) {
        this.graphqlClient = graphqlClient ? graphqlClient : apolloClient;
    }

    getContributionStatistics(nameWithOwner: string): Promise<ContributionStatistics[]> {
        console.log('Called getContributionStatistics for repository', nameWithOwner);
        return request.get({
            uri: `https://api.github.com/repos/${nameWithOwner}/stats/contributors`,
            headers: {
                'User-Agent': 'Webtree-Imprint',
                'authorization': 'Bearer ' + process.env.GITHUB_API_KEY
            },
            json: true
        });
    }

    getOrgRepositories(organisationName: string): Promise<OrgRepositories> {
        return this.graphqlClient.query({
            variables: {
                login: organisationName
            },
            query: GetOrgRepositories
        }).then(value => {
            return value.data;
        });
    }
}
