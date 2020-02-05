/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserRepositories
// ====================================================

export interface UserRepositories_user_organizations_nodes_repositories_nodes_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserRepositories_user_organizations_nodes_repositories_nodes_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserRepositories_user_organizations_nodes_repositories_nodes_parent {
  __typename: "Repository";
  /**
   * The repository's name with owner.
   */
  nameWithOwner: string;
}

export interface UserRepositories_user_organizations_nodes_repositories_nodes {
  __typename: "Repository";
  /**
   * The repository's name with owner.
   */
  nameWithOwner: string;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: UserRepositories_user_organizations_nodes_repositories_nodes_stargazers;
  /**
   * A list of users watching the repository.
   */
  watchers: UserRepositories_user_organizations_nodes_repositories_nodes_watchers;
  /**
   * Identifies if the repository is a fork.
   */
  isFork: boolean;
  /**
   * The repository parent, if this is a fork.
   */
  parent: UserRepositories_user_organizations_nodes_repositories_nodes_parent | null;
}

export interface UserRepositories_user_organizations_nodes_repositories {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
  /**
   * A list of nodes.
   */
  nodes: (UserRepositories_user_organizations_nodes_repositories_nodes | null)[] | null;
}

export interface UserRepositories_user_organizations_nodes {
  __typename: "Organization";
  /**
   * A list of repositories that the user owns.
   */
  repositories: UserRepositories_user_organizations_nodes_repositories;
}

export interface UserRepositories_user_organizations {
  __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  nodes: (UserRepositories_user_organizations_nodes | null)[] | null;
}

export interface UserRepositories_user_repositories_nodes_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserRepositories_user_repositories_nodes_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserRepositories_user_repositories_nodes_parent {
  __typename: "Repository";
  /**
   * The repository's name with owner.
   */
  nameWithOwner: string;
}

export interface UserRepositories_user_repositories_nodes {
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
  stargazers: UserRepositories_user_repositories_nodes_stargazers;
  /**
   * A list of users watching the repository.
   */
  watchers: UserRepositories_user_repositories_nodes_watchers;
  /**
   * Identifies if the repository is a fork.
   */
  isFork: boolean;
  /**
   * The repository parent, if this is a fork.
   */
  parent: UserRepositories_user_repositories_nodes_parent | null;
}

export interface UserRepositories_user_repositories {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
  /**
   * A list of nodes.
   */
  nodes: (UserRepositories_user_repositories_nodes | null)[] | null;
}

export interface UserRepositories_user {
  __typename: "User";
  id: string;
  /**
   * A list of organizations the user belongs to.
   */
  organizations: UserRepositories_user_organizations;
  /**
   * A list of repositories that the user owns.
   */
  repositories: UserRepositories_user_repositories;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
