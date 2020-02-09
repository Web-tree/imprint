import {APIGatewayProxyHandler} from "aws-lambda";
import {UserRepository} from '../repo/user-repository';
import {UserService} from '../service/user-service';

const userRepository = new UserRepository();
export const getRepositories: APIGatewayProxyHandler = (event, _context) => {
    const login = event.pathParameters['login'];
    return userRepository
        .getUserRepositories(login)
        .then(result => {
            return {
                statusCode: 200,
                body: JSON.stringify(result.data)
            };
        });
};
export const getUserImprint: APIGatewayProxyHandler = (event, _context) => {
    const login = event.pathParameters['login'];
    return new UserService(userRepository).getImprint(login).then(value => {
        return {
            statusCode: 200,
            body: JSON.stringify(value)
        };
    });
};
