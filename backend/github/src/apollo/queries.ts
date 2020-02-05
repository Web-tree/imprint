import {gql} from 'apollo-boost';

export const GetUserRepositories = gql`
query UserRepositories($login: String!) {
  user(login: $login) {
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
`;
