interface Repository {
    name: string;
    nameWithOwner: string;
    forkCount: number;
    isFork: boolean;
    stargazers: Stargazers;
    watchers: Watchers;
    parent: Repository;
}

interface Stargazers {
    totalCount: number
}

interface Watchers {
    totalCount: number
}
