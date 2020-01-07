import {APIGatewayProxyHandler} from "aws-lambda";

export const getRepositories: APIGatewayProxyHandler = async (event, _context) => {
    const login = event.pathParameters['login'];
    new UserRepository().getUserRepositories(login);
    return {
        statusCode: 200,
        body: JSON.stringify({})
    };
};
