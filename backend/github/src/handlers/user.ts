import {APIGatewayProxyHandler} from "aws-lambda";
import {UserDatasource} from '../datasource/user.datasource';
import {UserService} from '../service/user.service';

const userRepository = new UserDatasource();
export const getRepositories: APIGatewayProxyHandler = (event, _context) => {
    const login = event.pathParameters['login'];
    return userRepository
        .getUserRepositories(login)
        .then(result => {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(result.data)
            };
        });
};
export const getUserImprint: APIGatewayProxyHandler = (event, _context) => {
    const login = event.pathParameters['login'];
    return new UserService(userRepository).getImprint(login).then(value => {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(value)
        };
    });
};
