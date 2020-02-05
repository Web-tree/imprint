import {APIGatewayProxyHandler} from "aws-lambda";
import {UserRepository} from "../repo/UserRepository";

export const getRepositories: APIGatewayProxyHandler = async (event, _context) => {
    const login = event.pathParameters['login'];
    return new UserRepository()
        .getUserRepositories(login)
        .then(result => {
            return {
                statusCode: 200,
                body: result.data
            };
        });
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({})
    // };
};
