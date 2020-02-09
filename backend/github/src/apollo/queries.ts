import {gql} from 'apollo-boost';

export const GetUserRepositories = gql`
query UserRepositories($login: String!) {
  user(login: $login) {
    id
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
        forkCount
      }
    }
  }
}
`;
