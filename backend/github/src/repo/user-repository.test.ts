import {UserRepository} from './user-repository';

describe('User Repository', () => {

    it('should return user repositories', (done) => {
        const userRepository = new UserRepository();
        userRepository
            .getUserRepositories('max-levitskiy')
            .then(value => {
                expect(value.data.user.repositories.nodes.values()).toBeDefined();
                done()
            })
    });
});
