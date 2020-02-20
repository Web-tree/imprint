/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserRepositories
// ====================================================

export interface UserRepositories_user_repositoriesContributedTo_nodes_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserRepositories_user_repositoriesContributedTo_nodes_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserRepositories_user_repositoriesContributedTo_nodes {
  __typename: "Repository";
  /**
   * The repository's name with owner.
   */
  nameWithOwner: string;
  /**
   * Returns how many forks there are of this repository in the whole network.
   */
  forkCount: number;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: UserRepositories_user_repositoriesContributedTo_nodes_stargazers;
  /**
   * A list of users watching the repository.
   */
  watchers: UserRepositories_user_repositoriesContributedTo_nodes_watchers;
  /**
   * Identifies if the repository is a fork.
   */
  isFork: boolean;
}

export interface UserRepositories_user_repositoriesContributedTo {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
  /**
   * A list of nodes.
   */
  nodes: (UserRepositories_user_repositoriesContributedTo_nodes | null)[] | null;
}

export interface UserRepositories_user {
  __typename: "User";
  id: string;
  /**
   * A list of repositories that the user recently contributed to.
   */
  repositoriesContributedTo: UserRepositories_user_repositoriesContributedTo;
}

export interface UserRepositories {
  /**
   * Lookup a user by login.
   */
  user: UserRepositories_user | null;
}

export interface UserRepositoriesVariables {
  login: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrgRepositories
// ====================================================

export interface OrgRepositories_organization_repositories_nodes {
  __typename: "Repository";
  id: string;
  /**
   * The repository's name with owner.
   */
  nameWithOwner: string;
}

export interface OrgRepositories_organization_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (OrgRepositories_organization_repositories_nodes | null)[] | null;
}

export interface OrgRepositories_organization {
  __typename: "Organization";
  id: string;
  /**
   * A list of repositories that the user owns.
   */
  repositories: OrgRepositories_organization_repositories;
}

export interface OrgRepositories {
  /**
   * Lookup a organization by login.
   */
  organization: OrgRepositories_organization | null;
}

export interface OrgRepositoriesVariables {
  login: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
