import {UserRepository} from './user-repository';

describe('User Repository', () => {

    it('should return user repositories', (done) => {
        const userRepository = new UserRepository();
        userRepository
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
