import {UserDatasource} from './user.datasource';

describe('User Datasource', () => {

    it('should return user repositories', (done) => {
        const userDatasource = new UserDatasource();
        userDatasource
            .getUserRepositories('max-levitskiy')
            // .getUserRepositories('cicd-webtree')
            .then(value => {
                expect(value.data.user.repositoriesContributedTo.nodes).toBeDefined();
                done()
            })
            .catch(reason => {
                console.error(reason);
                fail();
            })
    });
});
