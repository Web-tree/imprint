import {UserRepository} from './user-repository';

describe('User Repository', () => {

    it('should return user repositories', (done) => {
        const userRepository = new UserRepository();
        userRepository
            .getUserRepositories('max-levitskiy')
            // .getUserRepositories('cicd-webtree')
            .then(value => {
                console.log(value.data.user.repositories.nodes);
                done()
            })
            .catch(reason => {
                console.log(reason);
                fail()
            })
    });
});
