import {APIGatewayProxyHandler} from 'aws-lambda';
import {RepoService} from '../service/repo.service';

const repoService = new RepoService();
export const getOrgStatContribution: APIGatewayProxyHandler = (event, _context) => {
    const organisation = event.pathParameters['organisation'];
    return repoService
        .getOrgStatContribution(organisation)
        .then(result => {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(result)
            };
        });
};
