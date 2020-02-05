import {ApolloClient, ApolloQueryResult} from "apollo-client";
import {NormalizedCacheObject} from "apollo-boost";
import {GetUserRepositories} from '../apollo/queries';
import {UserRepositories} from '../apollo/github-generated-model';
import {apolloClient} from '../apollo/client';

export class UserRepository {

    constructor(private graphqlClient?: ApolloClient<NormalizedCacheObject>) {
        this.graphqlClient = graphqlClient ? graphqlClient : apolloClient;
    }

    getUserRepositories(login: string): Promise<ApolloQueryResult<UserRepositories>> {
        return this.graphqlClient.query({
            variables: {
                login: login
            },
            query: GetUserRepositories
        });
    }
}
