import {gql} from 'apollo-boost';

export const GetUserRepositories = gql`
query UserRepositories($login: String!) {
  user(login: $login) {
    id
    repositoriesContributedTo(first: 100) {
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
      }
    }
  }
}
`;
export const GetOrgRepositories = gql`
query OrgRepositories($login: String!) {
  organization(login: $login) {
    id
    repositories(first: 100) {
      nodes {
        id
        nameWithOwner
        isFork
        forkCount
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  }
}
`;
