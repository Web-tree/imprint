import {ApolloClient, ApolloQueryResult} from "apollo-client";
import {gql, HttpLink, InMemoryCache, NormalizedCacheObject} from "apollo-boost";

export class UserRepository {

    constructor(private graphqlClient?: ApolloClient<NormalizedCacheObject>) {
        this.graphqlClient = graphqlClient ? graphqlClient : new ApolloClient({
            cache: new InMemoryCache(),
            link: new HttpLink({
                uri: 'https://api.github.com/graphql'
            })
        });
    }

    getUserRepositories(login: string): Promise<ApolloQueryResult<Repository[]>> {
        return this.graphqlClient.query({
            variables: {
                'login': login
            },
            query: gql`{
              user(login: "$login") {
                id
                organizations(first: 100) {
                  nodes {
                    repositories(first: 100) {
                      totalCount
                      nodes {
                        nameWithOwner
                        stargazers {
                          totalCount
                        }
                        watchers {
                          totalCount
                        }
                        isFork
                        parent {
                          nameWithOwner
                        }
                      }
                    }
                  }
                }
                repositories(first: 100) {
                  totalCount
                  nodes {
                    nameWithOwner
                    forkCount
                    stargazers {
                      totalCount
                    }
                    watchers {
                      totalCount
                    }
                    isFork
                    parent {
                      nameWithOwner
                    }
                  }
                }
              }
            }
            `
        });
    }
}
